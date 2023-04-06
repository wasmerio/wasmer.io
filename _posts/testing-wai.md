---
title: 'Testing - WAI'
excerpt: 'Testing WAI packages using wasmer-pack-testing'
date: '2023-03-14T11:25:55.785Z'
author: Rudra
published: true
---

![https://images.unsplash.com/photo-1597279393696-d5701aee7bf7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb](https://images.unsplash.com/photo-1597279393696-d5701aee7bf7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb)

In my previous [article](https://wasmer.io/posts/WAI-is-the-answer), I explained how to port a Rust package for use in the JavaScript ecosystem. However, these published packages need to be tested within their own ecosystems to verify their functionality and identify any potential bugs.

## Testing in WAI

Testing for WAI has been made easier using an automated testing framework [`wasmer-pack-testing`](https://crates.io/crates/wasmer-pack-testing). This crate automatically discovers the tests for available language configurations for WAI and runs the tests correspondingly.

wasmer-pack-testing uses `jest` for JavaScript/Typescript and `pytest` for Python.

This testing framework allows for both **logical checks** through unit tests and **code generation** using snapshot testing.

## Tutorial Outline

- Introduction
- Environment Setup
- Bindings generation
- Testing for JavaScript

### Introduction

In this tutorial, we will test the recently published `rustfft` package, which demonstrates the portability and logical computation power of WebAssembly. WAI can be used to harness that power!

> 💡 RustFFT is a high-performance FFT library written in pure Rust.

### Environment Setup

The default testing using `cargo test` only runs the tests that are written using the `test` macro in the library files.To run integration tests, we can create a new file in a separate `tests` directory.

1. Create an integration tests file

   ```bash
   $ mkdir tests && touch tests/rustfft-integration-tests.rs
   ```

2. Let’s update our `cargo.toml` to indicate that we are providing a custom test harness.

   ```toml
   # Cargo.toml
   [dev-dependencies]
   anyhow = "1.0.68"
   tracing-subscriber = { version = "0.3.16", features = ["env-filter"] }
   wasmer-pack-testing = "0.7.0"

   [[test]]
   name = "rustfft-integration-tests"
   harness = false
   ```

3. Finally, let's write an integration test to generate bindings and test them against the appropriate target.

   ```rust
   // tests/rustfft-integration-tests.rs
   use anyhow::Error;
   use tracing_subscriber::EnvFilter;

   fn main() -> Result<(), Error> {
       tracing_subscriber::fmt()
           .with_env_filter(EnvFilter::from_default_env())
           .init();
       wasmer_pack_testing::autodiscover(env!("CARGO_MANIFEST_DIR"))?;
       Ok(())
   }
   ```

### Bindings Generation

To enable our testing suite to discover which targets to generate bindings for, let's create a blank JavaScript test file in the crate directory (the one with `Cargo.toml`) that `autodiscover()` can use.

Now let’s create a blank `rustfft.test.js` in the crate directory.

```bash
$ touch rustfft.test.js
```

Running the tests will generate a testing package (note the `package.json`) and bindings for your test to use.

```bash
$ cargo test
$ tree .
.
├── Cargo.lock
├── Cargo.toml
├── LICENSE_APACHE.md
├── LICENSE_MIT.md
├── generated_bindings
├── jest.config.js
├── node_modules
├── package.json
├── rustfft.test.js
├── rustfft.wai
├── snapshots
├── src
├── target
├── tests
└── yarn.lock
```

Our JavaScript generated bindings live inside `generate_bindings`.

> 🐍 Same would work for python if you place a [`test_rustfft.py`](http://rustfft.test.py) file in your root directory

### Testing with JavaScript

Now let’s write a test to see if it works, I have extracted a test case for the `dft` algorithm from the original `rustfft` crate.

```javascript
const { bindings } = require('@dynamite-bud/rustfft');

const {
  Complex,
  Algorithm,
} = require('@dynamite-bud/rustfft/src/bindings/rustfft/rustfft.js');

const { test, expect } = require('@jest/globals');

test('dft test len 3', async () => {
  const wasm = await bindings.rustfft();
  let signal = [
    { re: 1.0, im: 1.0 },
    { re: 2.0, im: -3.0 },
    { re: -1.0, im: 4.0 },
  ];
  let spectrum = [
    { re: 2.0, im: 2.0 },
    { re: -5.562177, im: -2.098076 },
    { re: 6.562178, im: 3.09807 },
  ];
  let dft = Algorithm.newDft(wasm, signal.length, 'forward');
  let output = dft.compute(signal);
  output.forEach((element, index) => {
    expect(element.re.toPrecision(5)).toBe(spectrum[index].re.toPrecision(5));
  });
});

test('dft test len 4', async () => {
  const wasm = await bindings.rustfft();
  let signal = [
    { re: 0.0, im: 1.0 },
    { re: 2.5, im: -3.0 },
    { re: -1.0, im: -1.0 },
    { re: 4.0, im: 0.0 },
  ];
  let spectrum = [
    { re: 5.5, im: -3.0 },
    { re: -2.0, im: 3.5 },
    { re: -7.5, im: 3.0 },
    { re: 4.0, im: 0.5 },
  ];
  let dft = Algorithm.newDft(wasm, signal.length, 'forward');
  let output = dft.compute(signal);
  output.forEach((element, index) => {
    expect(element.re.toPrecision(2)).toBe(spectrum[index].re.toPrecision(2));
  });
});
```

Running `cargo test` now will automatically run the `jest` test from above for us.

```bash
Finished test [unoptimized + debuginfo] target(s) in 0.46s
     Running unittests src/lib.rs (target/debug/deps/rustfft-e1e8db73703fde9b)

running 0 tests

test result: ok. 0 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s

     Running tests/rustfft-integration-tests.rs (target/debug/deps/rustfft_integration_tests-44dff04ad3dd20ad)
yarn install v1.22.19
warning package.json: No license field
info No lockfile found.
warning @dynamite-bud/rustfft@0.1.0: No license field
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...

success Saved lockfile.
✨  Done in 0.07s.
yarn install v1.22.19
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.08s.
yarn run v1.22.19
$ (...)/rustfft/node_modules/.bin/jest
 PASS  ./rustfft.test.js
  ✓ dft test len 3 (11 ms)
  ✓ dft test len 4 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.169 s
Ran all test suites.
✨  Done in 0.76s.

```

We see here that our tests run using the `jest` testing suite and both test cases pass successfully.

## Conclusion

In this tutorial, we got to know how to testing your published packages with WAI. The testing was done using JavaScript. This testing also concludes that our logic internally is working correctly and correct bindings are being generated for our package in JavaScript.

## Appendix

- [`rustfft`](https://wapm.io/dynamite-bud/rustfft) on [WAPM](https://wapm.io)
- [`rustfft`](https://crates.io/crates/rustfft) on [crates.io](https://crates.io)
- [`wasmer-pack-testing`](https://docs.rs/wasmer-pack-testing/latest/wasmer_pack_testing/) on [docs.rs](https://docs.rs)
- [`jest`](https://jestjs.io/) testing suite for JavaScript
