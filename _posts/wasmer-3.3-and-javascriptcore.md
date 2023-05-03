---
title: 'Wasmer 3.3 - Running WebAssembly 2.5x faster with JavascriptCore'
excerpt: 'Wasmer 3.3 - Running WebAssembly 2.5x faster with JavascriptCore'
date: '2023-05-03T12:00:00.000Z'
author: Syrus Akbary
published: false
---

The power of Wasmer relies on **delivering one universal API to run WebAssembly** programs anywhere. On that quest, we worked hard to extend Wasmer by adding support for *more backends*, starting with JavaScriptCore. Today are incredibly excited to ship JSC support in Wasmer v3.3.

Now you can use `wasmer` to run WebAssembly programs in macOS and Linux, powered by the same engine behind the Safari browser: `JavaScriptCore`. 

> We were hoping to have native support as well on iOS, but unfortunately as of the latest release of iOS: 16.4.1 WebAssembly is no longer available in JavaScriptCore. Once Apple enables it, you should be able to use Wasmer via JSC in iOS!

Thanks to JavascriptCore we have been able to achieve incredible speed (**2.5x faster than Cranelift!**) in a M1 Max chip (see [Performance](#performance) section for more info)

The `jsc` feature makes possible using Wasmer on macOS with a minimal dependency chain (no compilers or JITs will be included in the final macOS binary whatsoever, it will be using JavaScriptCore, already included by default in the system library!).

Supporting JavaScriptCore in Wasmer had another side effect: since Wasmer supports wasm-c-api, you can now get a **fully working wasm-c-api API for JavascriptCore**! Download the release here: [insert url]

As of the latest release (`v3.3.0`), Wasmer supports the following runtime backends:

- Native
    - LLVM (`llvm` feature)
    - Cranelift (`cranelift` feature)
    - Singlepass (`singlepass` feature)
    - **[new]** JavascriptCore  (`jsc` feature)
    - *V8 or Wasmi?* ([**vote for it**](https://github.com/wasmerio/wasmer/discussions/3839)!)
- Browser (JS) (`js` feature)
    
    `wasmer` can already be compiled to Wasm and be used in your browser via `wasm-bindgen`. Read more about it here:
    [https://wasmer.io/posts/wasmer-js-a-new-hope](https://wasmer.io/posts/wasmer-js-a-new-hope)
    

> Would you like to have V8 or Wasmi support in Wasmer and see how each engine performs against each other? Cast your vote! [The first backend to reach 20 votes](https://github.com/wasmerio/wasmer/discussions/3839) will be fully implemented and available in the next version of Wasmer!

We aim for Wasmer to become the **universal API layer to use WebAssembly anywhere**, no matter what engine you want to use under the hood. Wasmer will make a breeze for you to switch between the backend of your choosing: LLVM, Cranelift, Singlepass, JavaScriptCore…

Of course, your runtime needs might change over time, so it should be trivial for you to trial the backend best suited for your needs each time.

This by itself is awesome, but there is another reason this is also great for the WebAssembly community:

It unites all different engines into one universal API. Imagine if in the Javascript World, Node.js or Deno were not tied to V8, if Bun was not tied to JSC. Imagine if you could switch Javascript engines easily when using Node, Deno or Bun, and choose always the most convenient engine for your workload.

We have done that in the WebAssembly world… and the crop yieldings are just yet to come!

<a id="performance"></a>

## Performance

Now that JSC is fully integrated, we can compare easily how CoreMark performs in JavascriptCore vs Cranelift on a M1 Max chip. Since our WASI implementation is also completely universal, we can simply run WASI programs and see how they perform.

Cranelift: **10368.659772**

```bash
$ wasmer run vshymanskyy/coremark
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 2109026816
Total time (secs): 19.288896
Iterations/Sec   : 10368.659772
Iterations       : 200000
Compiler version : Clang 11.0.0 (https://github.com/llvm/llvm-project 176249bd6732a8044d457092ed932768724a6f06)
Compiler flags   : -O3
Memory location  : STATIC
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0x4983
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 10368.659772 / Clang 11.0.0 (https://github.com/llvm/llvm-project 176249bd6732a8044d457092ed932768724a6f06) -O3    / STATIC
```

JavascriptCore: **24286.414544** …that’s almost **2.5x faster than Cranelift!**

```bash
$ wasmer-jsc run vshymanskyy/coremark
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 3762650408
Total time (secs): 12.352585
Iterations/Sec   : 24286.414544
Iterations       : 300000
Compiler version : Clang 11.0.0 (https://github.com/llvm/llvm-project 176249bd6732a8044d457092ed932768724a6f06)
Compiler flags   : -O3
Memory location  : STATIC
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0xcc42
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 24286.414544 / Clang 11.0.0 (https://github.com/llvm/llvm-project 176249bd6732a8044d457092ed932768724a6f06) -O3    / STATIC
```

## How you can use it

It’s trivial to use `JavascriptCore` with `wasmer`. Just add the `jsc` feature when using the `wasmer` dependency on your `Cargo.toml` (with no default-features).

All the features of Wasmer are already supported (threads, WASI, …)

```toml
[dependencies]
wasmer = { version = "3.2.1", default-features=false, features=["jsc"]}
```

And that’s it!

Now, you can use the Wasmer API as you would normally:

```rust
let mut store = Store::default();
// We can use the WAT syntax as well!
let module = Module::new(
    &store,
    br#"(module
        (func $sum (import "env" "sum") (param i32 i32) (result i32))
        (func (export "add_one") (param i32) (result i32)
            (call $sum (local.get 0) (i32.const 1))
        )
    )"#,
	)?;

fn sum(a: i32, b: i32) -> i32 {
    a + b
}

let import_object = imports! {
    "env" => {
        "sum" => Function::new_typed(&store, sum),
    }
};
let instance = Instance::new(&mut store, &module, &import_object)?;

let add_one: TypedFunction<i32, i32> = instance.exports.get_typed_function("add_one")?;
add_one.call(&mut store, 1)?
```

Et voila! Now you have have this code as iOS or macOS app fully working with a minimal dependency of Wasmer (with no compilers or JIT needed) working at full speed on your application!

## How is this possible?

We used the `rusty_jsc` project, originally created by [Pekka Enberg](https://github.com/penberg) . `rusty_jsc` provides a lean “Rusty” API to use JavascriptCore locally.

We had to do some improvements to the APIs to make the integration fully work, as `rusty_jsc` was fairly incomplete. We would like to publicly thank Pekka for letting Wasmer take the lead for moving the development for `rusty_jsc` forward!

The integration of `rusty_jsc` into Wasmer was mostly trivial, with the exception of connecting native `Function`s with JavascriptCore Function Callbacks.

One of the most challenging feats we achieved was enabling the ability to create JavascriptCore callbacks at runtime with Rust closures.

In this example we have created a JS closure that uses the `multiplier` variable from the parent Rust scope:

```rust
use rusty_jsc::{callback_closure, JSContext, JSValue};

let context = JSContext::default();
let multiplier = 10f64;

let callback = callback_closure!(
    &context,
    move |ctx: JSContext, _func: JSObject, _this: JSObject, args: &[JSValue]| {
        let num = args[0].to_number(&ctx).unwrap();
        Ok(JSValue::number(&ctx, num * multiplier))
    }
);
let result = callback
    .call(
        &context,
        Some(&callback),
        &[JSValue::number(&context, 5f64)],
    )
    .unwrap();

assert_eq!(result.to_number(&context).unwrap(), 50f64)
```

You can see [the PR making JavascriptCore available in Wasmer here](https://github.com/wasmerio/wasmer/pull/3825), if you are curious of how much effort it took to add a new backend! (tl;dr: not really that much!)

## Why you would want to use Wasmer with JavascriptCore?

There are two use cases that we believe are critical.

1. If you are working on a macOS application and you want to use WebAssembly at incredible speeds also while delivering a minimal binary dependency (since JavascriptCore is always available in macOS)
2. ~~If you want to run WebAssembly applications in iOS without your app being in JIT mode (no apps)~~

Can’t wait to see what you are going to build next with Wasmer!
