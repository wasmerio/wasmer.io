---
title: 'Wasmer-JS: A New Beginning'
excerpt: 'Wasmer-JS: A New Beginning'
date: '2021-12-07T00:00:00.000Z'
author: Syrus Akbary
published: true
---

Trusted by thousands of developers worldwide, Wasmer is the first production-ready WebAssembly runtime for Python, Go, Ruby, Java, and more.

With the latest 2.1 release, we completely overhauled and engineered Wasmer to deliver the **most ergonomic API experience** for running WebAssembly anywhere, including web browsers, [Node.js](https://nodejs.dev/) and even [Deno](https://deno.land/).

And we're just getting started!

Until now, Wasmer tooling enabled server-side and browser-based execution of WebAssembly programs using two different implementations, Rust on the server and Wasmer JS (with a custom syscall implementation in JS) for the browser. Thanks to `wasm-bindgen` and a few tricks that we will detail below, we enabled the same server-side Wasmer-API written in Rust in the browser, eliminating inconsistency issues and simplifying the development and maintenance of the code-base.

# Let's get into it!

### Rust

Any third-party dependencies using Wasmer in Rust can now easily target browser environments for executing server-side code via `wasm-bindgen` and `wasm-pack.`

You can target the browser easily using Wasmer in Rust, with the `js-default` feature of the wasmer crate.

`Cargo.toml`

```yaml
[dependencies]
wasmer = { version = "2.1.0", default-features=false, features=["js-default"]}
```

```rust
use wasmer::{Store, Module, Function, Instance, NativeFunction};

#[wasm_bindgen]
fn add_one(num: i32) -> Result<i32> {
		let store = Store::default();
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
            "sum" => Function::new_native(&store, sum),
        }
    };
    let instance = Instance::new(&module, &import_object)?;

    let add_one: NativeFunction<i32, i32> = instance.exports.get_native_function("add_one")?;
    add_one.call(1)?
}
```

This code will run your WebAssembly programs on the browser, using the native browser WebAssembly engine, but leverage the Wasmer-API.

### Wasmer WASI for Node.js

The previous version of the `@wasmer/wasi` NPM package reimplemented WASI system calls in JS, leading to inconsistency issues with the Wasmer Rust implementation.

The new release of `wasmer-js` leverages the Wasmer WASI Rust implementation thanks to `wasm-bindgen`. As a result, we offer seamless cross-platform support for WebAssembly applications that leverage the same WASI implementation in the browser or on the server.

Here is an example of the new, easier to use, simplified WASI javascript API!

```js
// npm install --save @wasmer/wasi
import { init, WASI } from '@wasmer/wasi';

// This is needed to load the WASI library first
await init();

let wasi = new WASI({
  env: {},
  args: [],
});

const moduleBytes = fetch("https://deno.land/x/wasm@v1.0.0-alpha4/tests/demo.wasm");
const module = await WebAssembly.compileStreaming(moduleBytes);
await wasi.instantiate(module, {});

let exitCode = wasi.start();
let stdout = wasi.getStdoutString();
 // This should print "hello world (exit code: 0)"
console.log(`${stdout}(exit code: ${exitCode})`);
```

Success! The implementation works, and it's useful for us; we thought it could be helpful for other developers and companies.

You can install [@wasmer/wasi](https://www.npmjs.com/package/@wasmer/wasi) using NPM and run it in the browser or Node. Check [Node usage examples in our repo](https://github.com/wasmerio/wasmer-js/tree/main/examples/node).

### Wasmer WASI for Deno

Deno is a modern Javascript and Typescript runtime based on V8.

Since `wasmer` now targets any Javascript Environment, we created a Deno package to showcase Wasmer WASI implementation portability across multiple environments:

```ts
import { init, WASI } from 'https://deno.land/x/wasm/wasi.ts';

// This is needed to load the WASI library first
await init();

let wasi = new WASI({
  env: {},
  args: [],
});

const moduleBytes = fetch("https://deno.land/x/wasm/tests/demo.wasm");
const module = await WebAssembly.compileStreaming(moduleBytes);
await wasi.instantiate(module, {});

let exitCode = wasi.start();
let stdout = wasi.getStdoutString();
 // This should print "hello world (exit code: 0)"
console.log(`${stdout}(exit code: ${exitCode})`);
```

Check [Deno usage examples in our repo](https://github.com/wasmerio/wasmer-js/tree/main/examples/deno).

# How we did it

Clearly, `wasm-bindgen` and `wasm-pack` are critical components for packaging Rust code for Javascript projects. However, two additional elements are essential for enabling `wasmer-wasi` in Javascript environments, **Module Introspection,** and a **Virtual File System.**

## Module Introspection

WebAssembly currently lacks an appropriate reflection API to facilitate type introspection for Javascript (...although there is a [fantastic proposal](https://github.com/WebAssembly/js-types/blob/master/proposals/js-types/Overview.md) for it!). Due to this limitation, we used `wasmparser`, an optional lightweight parser that allows developers to inspect and output type information enabling the use of typed functions with ease.

Simply use `Module::imports` and `Module::exports` to check types for functions, tables, and globals to ensure they are not misused at runtime.

## Virtual File System

To support file system operations for WebAssemby and WASI, we created `wasmer_vfs`, a virtual file system that works with `wasmer-wasi`. `wasmer_vfs` supports two file system implementations:

- **`host_fs`,** an API that leverages [the standard std::fs Rust API](https://doc.rust-lang.org/std/fs/) to use the host file system if it exists.
- **`mem_fs`,** a Wasmer API that implements an in-memory file system.

Dual support for `host_fs` and `mem_fs` enables stateful and stateless WebAssembly deployments allowing developers to make tradeoffs that make sense for their applications. In completely stateless environments, `mem_fs` emulates a fully sandboxed file system for loading configurations or managing runtime state.

## Lightweight Packaging

`Wasmer-JS` is exceptionally lightweight. Without WASI support, the size of our "runner" WebAssembly module is about 25kb uncompressed and 5kb compressed. With WASI support, it's about 550kb uncompressed and 140kb compressed. Developers can expect runtime performance similar to what the JavaScript host provides. Wasmer utilizes the native WebAssembly runtimes provided by host environments like Firefox, Chrome, Safari, Node.js, or Deno, for minimizing overhead and optimizing performance.

# Conclusion

`wasmer-wasi` now uses the same underlying Rust code to enable server-side and browser-based execution of WebAssembly applications. New [NPM](https://www.npmjs.com/package/@wasmer/wasi) and [Deno](https://deno.land/x/wasm) packages now include `wasmer_vfs` and are available for download.

A special thanks and shout-out to our friends at [Tokera](https://tokera.com/); they are instrumental contributors to the ecosystem, and they're already leveraging our new capabilities in their open-source WebAssembly Shell:

[https://github.com/tokera-com/ate](https://github.com/tokera-com/ate)
