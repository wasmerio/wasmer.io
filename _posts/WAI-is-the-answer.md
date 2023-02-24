---
title: 'WAI is the Answer !!!'
excerpt: 'Porting libraries to npm and pip made easy with WAI'
date: '2023-02-08T13:30:37.390Z'
author: Rudra
published: true
---

## _Ding Dong_

“**Sir, we are here to move your package.**”

![packers and movers](/images/blog/packers-and-movers.jpg)

**That’s right** we at Wasmer move your packages for free

> 🗒️ Note: Package refers to a library/executable that you might have developed for a certain language

# What are we going to do?

For this tutorial we will be publishing [the `sgp4` crate](https://github.com/neuromorphicsystems/sgp4/), a library used to predict the location of satellites in orbit after a certain amount of time.

You can find the [dynamite-bud/sgp4](https://wapm.io/dynamite-bud/sgp4) package on WAPM.

At the end we’ll be able to use `sgp4` from JavaScript like this.

```javascript
const resolveResult = ({ tag, val }) => (tag === 'err' ? new Error(val) : val);

const wasm = await bindings.sgp4();
let response = await fetch(
  'https://celestrak.com/NORAD/elements/gp.php?GROUP=galileo&FORMAT=json',
);
let elementsArr = (await response.json()).map((e) =>
  resolveResult(Elements.fromJson(wasm, JSON.stringify(e))),
);
for (let elements of elementsArr) {
  console.log(elements.getObjectName());
  let constants = resolveResult(Constants.fromElements(wasm, elements));
  for (let hours of [12, 24]) {
    console.log(`    t = ${hours * 60} min`);
    let prediction = resolveResult(constants.propagate(parseFloat(hours * 60)));
    console.log(`        r = ${prediction.position} km`);
    console.log(`        ṙ = ${prediction.velocity} km.s⁻¹`);
  }
}
```

Here we used the official introductory example from original `sgp4`.

**Tutorial Outline:**

1. Installation and Environment Setup
2. Create and use the WAI
3. Library Implementation
4. Publish to WAPM
5. Using the package from JavaScript
6. Conclusion

## Installation

### Environment Setup

You will need to install several CLI tools.

- [The Rust toolchain](https://rustup.rs/) so we can compile Rust code

```shell-session
  $ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- the `wasm32-unknown-unknown` target so Rust knows how to compile to WebAssembly

```shell-session
  $ rustup target add wasm32-unknown-unknown
```

- [The Wasmer runtime](https://docs.wasmer.io/ecosystem/wasmer/getting-started) so we can interact with WAPM

```shell-session
  $ curl https://get.wasmer.io -sSfL | sh
```

- [The `cargo wapm` sub-command](https://lib.rs/cargo-wapm) for publishing to WAPM

```shell-session
  $ cargo install cargo-wapm
```

Once you've installed those tools, you'll want to create a new account on [wapm.io](https://wapm.io/signup) so we have somewhere to publish our code to.

Running the `wapm login` command will let you authenticate your computer with WAPM.

### Project Setup

We want to start with a blank library project named `sgp4`.

```ebnf
$ cargo new --lib sgp4
$ cd sgp4
```

### Cargo TOML Setup

In order to publish to WAPM, we’ll need to populate the project’s `Cargo.toml` file with some extra metadata.

> 💡 Some required attributes by WAPM are **name**, **description** and **version**.

Another property to update is `crate-type`. This can take various arguments such as `cdylib` , `rlib` , etc. For more info on [linkage](https://doc.rust-lang.org/reference/linkage.html).

> 🔗 **crate-type** here specifies the kind of linkage we want. We’ll be using **cdylib** for generating a C Dynamic Library which will be further used to generate a **.wasm** binary.

> ⚠️ We will also introduce a package rename in our dependencies, otherwise we’d get naming conflicts as our package is also named `sgp4`. Therefore, we refer to the original `sgp4` rust crate as `original`.

```toml
# Cargo.toml

[package]
name = "sgp4"
version = "0.1.0"
description = "sgp4 for wasm, published on WAPM"

[lib]
crate-type = ["cdylib"]

[dependencies]
wai-bindgen-rust = "0.2.2"
original = { version = "0.8.2", package = "sgp4" }
```

## Create and use WAI

### What is WAI ?

[WAI](https://github.com/wasmerio/wai) or WebAssembly Interfaces is an _“[Interface Definition Language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL)”_ like Protobufs or WebIDL, for interaction with multiple languages.

Files for WAI use the `*.wai` extension.

The WAI project has a variety of code generators, however the one we’ll be using today is `wai_bindgen_rust`. This Rust crate uses macros to take a WAI file and generate all the glue code we need to implement a WebAssembly module in Rust.

> Let’s Port! 🪄

### Creating the WAI file

Now let’s create a `sgp4.wai` file for our library for defining what our generated library should have.

```ebnf
$ touch sgp4.wai
```

The original `sgp4` crate has multiple members in structs, enums and constants and functions.

Let’s look at a couple examples from the `sgp4` crate’s public API and go through the thought process for representing them in WAI.

**[`Orbit`](https://docs.rs/sgp4/0.8.2/sgp4/struct.Orbit.html)**

In the original crate, `Orbit` is defined as a struct that has only one constructor and no associated behaviour. The easiest way to represent this in WAI is using a record and a top-level function returning a new instance of that record.

```ebnf
record orbit {
    inclination: float64,
    right-ascension: float64,
    eccentricity: float64,
    argument-of-perigee: float64,
    mean-anomaly: float64,
    mean-motion: float64,
}

/// Create a new Brouwer orbit representation from Kozai elements.
orbit-from-kozai-elements: func(
    geopotential: geopotential,
    inclination: float64,
    right-ascension: float64,
    eccentricity: float64,
    argument-of-perigee: float64,
    mean-anomaly: float64,
    kozai-mean-motion: float64,
) -> expected<orbit, error>
```

The [ResonanceState](https://docs.rs/sgp4/0.8.2/sgp4/struct.ResonanceState.html) type is treated like an “object” with internal state and associated behaviour.

```ebnf
resource resonance-state {
    t: func() -> float64
}
```

**[`Classification`](https://docs.rs/sgp4/0.8.2/sgp4/enum.Classification.html)**

Note: Enums in `wai` are compiled directly and don’t require an implementation. They also don’t have a specified type with them.

```ebnf
enum classification {
    unclassified,
    classified,
    secret,
}
```

**[`WGS72`](https://docs.rs/sgp4/0.8.2/sgp4/constant.WGS72.html)**

WAI doesn’t allow WebAssembly modules to expose constants directly, so we introduce a function the `WGS72` constant.

```ebnf
wgs72: func() -> geopotential
```

**[`iau_epoch_to_sidereal_time`](https://docs.rs/sgp4/0.8.2/sgp4/fn.iau_epoch_to_sidereal_time.html)**

```ebnf
iau-epoch-to-sidereal-time: func(epoch: float64) -> float64
```

> 💡 For the full code check this [repository](https://github.com/wasmerio/sgp4)

### Using the WAI file

We want to tell the `wai_bindgen_rust` crate that this crate exports `sgp4.wai` so that it can generate glue code for this [`wai`](https://github.com/wasmerio/sgp4/blob/main/sgp4.wai) file.

```rust
// lib.rs
wai_bindgen_rust::export!("sgp4.wai");
```

> 💡 Note: **sgp4.wai** is relative to the crate's root - the folder containing your **Cargo.toml** file

Now, As we included this `sgp4.wai` in our `lib.rs`. We can do a `cargo expand` as a smoke test to see if the glue code gets generated.

```shell-session
$  cargo expand
```

```rust
unsafe extern "C" fn __wai_bindgen_sgp4_constants_initial_state(arg0: i32) -> i32 {
        let result = <super::Constants as Constants>::initial_state(
            &wai_bindgen_rust::Handle::from_raw(arg0),
        );
        let ptr0 = SGP4_RET_AREA.0.as_mut_ptr() as i32;
...
```

## Library Implementation

Let’s run `cargo check` and use the error messages to see what we need to do next.

```shell-session
$ cargo check

error[E0412]: cannot find type `ResonanceState` in module `super`
  --> src/lib.rs:12:1
   |
12 | wai_bindgen_rust::export!("sgp4.wai");
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ not found in `super`
   |
   = note: consider importing one of these items:
           crate::original::ResonanceState
           original::ResonanceState
   = note: this error originates in the macro `wai_bindgen_rust::export` (in Nightly builds, run with -Z macro-backtrace for more info)

error[E0412]: cannot find type `ResonanceState` in module `super`
  --> src/lib.rs:12:1
   |
12 | wai_bindgen_rust::export!("sgp4.wai");
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ not found in `super`
   |
   = note: consider importing one of these items:
           crate::original::ResonanceState
           crate::sgp4::ResonanceState
           original::ResonanceState
   = note: this error originates in the macro `wai_bindgen_rust::export` (in Nightly builds, run with -Z macro-backtrace for more info)

error[E0412]: cannot find type `Sgp4` in module `super`
  --> src/lib.rs:12:1
   |
12 | wai_bindgen_rust::export!("sgp4.wai");
   | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ not found in `super`
   |
...
```

So it looks like we need to create `Sgp4`,`Constants`, `Elements` and `ResonanceState`.

> 💡 Note: The type **Sgp4** is a special type as it contains the top level functions we defined and it can't have a **static** modifier for initialisation, only member functions.

- **`Sgp4`**

  ```rust
  // lib.rs

  struct Sgp4;

  impl sgp4::Sgp4 for Sgp4 {
      fn orbit_from_kozai_elements(
          geopotential: Geopotential,
          inclination: f64,
          right_ascension: f64,
          eccentricity: f64,
          argument_of_perigee: f64,
          mean_anomaly: f64,
          kozai_mean_motion: f64,
      ) -> Result<Orbit, SgpError> {
          Ok(original::Orbit::from_kozai_elements(
              &geopotential.into(),
              inclination,
              right_ascension,
              eccentricity,
              argument_of_perigee,
              mean_anomaly,
              kozai_mean_motion,
          )?
          .into())
      }

      fn wgs84() -> Geopotential {
          original::WGS72.into()
      }

      fn iau_epoch_to_sidereal_time(epoch: f64) -> f64 {
          original::iau_epoch_to_sidereal_time(epoch)
      }
  }
  ```

- **`ResonanceState`**
  We gave resonance state a type of `Mutex<original::ResonanceState>` here as we want to hold a the `original::Resonance` state in a Mutex because later we see that `ResonanceState` is used as a mutable reference in an argument in a `Constants` struct’s function **[`propagate_from_state`](https://docs.rs/sgp4/0.8.2/sgp4/struct.Constants.html#method.propagate_from_state)**. For more information you can follow this [read](https://wasmerio.github.io/wasmer-pack/user-docs/tutorial/05-resources.html#:~:text=A%20Note%20On,the%20borrow%20checker.).

  ```rust
  //lib.rs

  struct ResonanceState(Mutex<original::ResonanceState>);
  impl ResonanceState {
      fn new(state: original::ResonanceState) -> Self {
          ResonanceState(Mutex::new(state))
      }
  }

  impl sgp4::ResonanceState for ResonanceState {
      fn t(&self) -> f64 {
          self.0.lock().expect("The mutex was poisioned").t()
      }
  }
  ```

All of the types we’ve implemented are just wrappers around the corresponding struct from the original `sgp4` crate. We can implement the `From` trait to make converting back and forth easier.

> 🔗 The **From** implementations can be found [here](https://github.com/wasmerio/sgp4/blob/main/src/lib.rs#L256-L428)

## Publishing to WAPM

Now we’ve ported `sgp4` we can publish it to WAPM.

For publishing to [wapm.io](https://wapm.io/) we will use the [cargo-wapm](https://crates.io/crates/cargo-wapm) subcommand.

The `cargo wapm` sub-command can do a lot of the heavy lifting (compiling to WebAssembly, constructing a WAPM package, publishing, etc.), but it needs some extra metadata to do its job:

```toml
# Cargo.toml

[package.metadata.wapm]
namespace = "dynamite-bud"
abi = "none"
bindings = { wai-version = "0.2.0", exports = "sgp4.wai" }
```

We need three things here:

- `namespace`; you need to replace it with your username on WAPM
- `abi`; The application binary interface tells hosts how the library was compiled. We compiled to `wasm32-unknown-unknown` so we set the ABI to `none`.
- `bindings`; It specifies the version of WAI we’re using and the path to our `sgp4.wai` file

Let’s try our configuration 📦:

```
$ cargo wapm --dry-run
2023-02-07T10:31:34.216323Z  INFO publish: cargo_wapm: Publishing dry_run=true pkg="sgp4"
Successfully published package `dynamite-bud/sgp4@0.1.0`
[INFO] Publish succeeded, but package was not published because it was run in dry-run mode
2023-02-07T10:31:34.395731Z  INFO publish: cargo_wapm: Published! pkg="sgp4"
```

### Let’s Publish 🚀

Now the package is ready, let’s publish it.

```
$ cargo wapm
2023-02-07T10:33:22.597922Z  INFO publish: cargo_wapm: Publishing dry_run=false pkg="sgp4"
[1/2] ⬆️   Uploading...
[2/2] 📦  Publishing...
Successfully published package `dynamite-bud/sgp4@0.1.0`
2023-02-07T10:33:26.705101Z  INFO publish: cargo_wapm: Published! pkg="sgp4"
```

> 🎉 Yaaay! We’ve published our package to WAPM!

As you see my package is published at [wapm.io](https://wapm.io/dynamite-bud/sgp4@0.1.0). You’ll also see that the `Python` and `JavaScript` bindings were automatically generated.

![WAPM package Upload](/images/blog/wapm-io-package-upload.png)

## Using the Package from JavaScript 🌏

Let’s initialise an empty directory and install the JavaScript package for `sgp4`.

```
$ mkdir sgp4-js
$ wapm install dynamite-bud/sgp4@0.1.0 --npm
...
up to date, audited 2 packages in 3s
found 0 vulnerabilities
```

Our `package.json` would be updated to this

```json
//package.json
{
  "dependencies": {
    "@dynamite-bud/sgp4": "https://registry-cdn.wapm.io/bindings/generator-0.6.0/npm/dynamite-bud/sgp4/sgp4-0.1.0.tar.gz"
  }
}
```

Let’s try a sample [test case](https://github.com/neuromorphicsystems/sgp4/blob/f0d3ec1a7c69d6f2d3a56e21b061814cd6987505/test_cases.toml#L70-L99) from `original` crate.

```js
// main.js

const { bindings } = require('@dynamite-bud/sgp4');
const {
  Elements,
  Constants,
} = require('@dynamite-bud/sgp4/src/bindings/sgp4/sgp4.js');

const TEST_CASE = {
  line1:
    '1 11801U          80230.29629788  .01431103  00000-0  14311-1 0    13',
  line2:
    '2 11801  46.7916 230.4354 7318036  47.4722  10.4117  2.28537848    13',
  states: [
    {
      time: 0,
      position: [7473.37102491, 428.94748312, 5828.74846783],
      velocity: [5.107155391, 6.444680305, -0.186133297],
    },
    {
      time: 360,
      position: [-3305.22148694, 32410.84323331, -24697.16974954],
      velocity: [-1.301137319, -1.1513156, -0.283335823],
      date: '1980-08-17T13:06:40.136Z',
    },
    {
      time: 720,
      position: [14271.29083858, 24110.44309009, -4725.76320143],
      velocity: [-0.320504528, 2.679841539, -2.084054355],
      date: '1980-08-17T19:06:40.136Z',
    },
    {
      time: 1080,
      position: [-9990.05800009, 22717.34212448, -23616.88515553],
      velocity: [-1.016674392, -2.290267981, 0.728923337],
      date: '1980-08-18T01:06:40.136Z',
    },
    {
      time: 1440,
      position: [9787.87836256, 33753.32249667, -15030.79874625],
      velocity: [-1.094251553, 0.923589906, -1.522311008],
      date: '1980-08-18T07:06:40.136Z',
    },
  ],
};

const resolveResult = ({ tag, val }) => {
  if (tag === 'err') {
    throw val;
  }
  return val;
};

const POSITION_PRECISION = Math.pow(10, -6);
const VELOCITY_PRECISION = Math.pow(10, -9);

(async () => {
  const wasm = await bindings.sgp4();
  try {
    let elements = resolveResult(
      Elements.fromTle(wasm, null, TEST_CASE.line1, TEST_CASE.line2),
    );

    let constants = resolveResult(
      Constants.fromElementsAfspcCompatibilityMode(wasm, elements),
    );

    let result = TEST_CASE.states.reduce((acc, state) => {
      let { time, position, velocity } = state;
      let prediction = resolveResult(
        constants.propagateAfspcCompatibilityMode(time),
      );

      return (
        position.reduce(
          (acc, val, i) =>
            acc & (Math.abs(val - prediction.position[i]) < POSITION_PRECISION),
          true,
        ) &
        velocity.reduce(
          (acc, val, i) =>
            acc & (Math.abs(val - prediction.velocity[i]) < VELOCITY_PRECISION),
          true,
        )
      );
    }, true);

    console.log(result ? 'Test passed' : 'Test failed');
  } catch (e) {
    console.log(e);
  }
})();
```

Running the `JavaScript` code:

```
$ node main.js
Test passed
```

## Conclusion

In this article, we learned many things about the Wasmer ecosystem such as:

- Using a `*.wai` to write an IDL file for your favourite package
- Writing a library implementation for a WAI file in Rust
- How to configure your package for WAPM
- Ported your library to JavaScript and Python

And **congratulations**, with the gracious powers of WebAssembly and Wasmer; Now you have published not one but three packages.

### 🏋🏼 **Exercise Time**

Here, is a WAI file for you to experiment with and make a library for yourself.

```ebnf
// complex-number.wai

record complex {
  re: float32,
  im: float32,
}

resource calculator {
  static new: func() -> calculator
  add: func(value: complex)
  sub: func(value: complex)
  mul: func(value: complex)
  current-value: func() -> complex
  history: func() -> list<operation>
}

variant operation {
  add(complex),
  mul(complex),
  sub(complex),
}

add: func(a: complex, b: complex) -> complex
mul: func(a: complex, b: complex) -> complex
sub: func(a: complex, b: complex) -> complex
```

Using this WAI file you can make a complex number calculator that can add, subtract and multiply while preserving the history of all the operations performed.

> 💡 Don’t forget to publish to WAPM 🚀

## Appendix

- original **`sgp4`** [repository](https://github.com/neuromorphicsystems/sgp4)
- `sgp4` [repository](https://github.com/wasmerio/sgp4)
- `sgp4` on [wapm.io](https://wapm.io/dynamite-bud/sgp4)
- [wai-bindgen-rust](https://crates.io/crates/wai-bindgen-rust)
- [`wapm.io`](https://wapm.io)
- [`cargo wapm`](https://crates.io/crates/cargo-wapm)
