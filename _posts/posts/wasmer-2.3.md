---
title: "Wasmer 2.3"
excerpt: "Wasmer 2.3"
date: "2022-06-07T12:00:00.000Z"
author: Syrus Akbary
published: true
---

Today we are excited to launch the next version of Wasmer before our next big release: 3.0.

Here are some of the things that the Wasmer 2.3 release includes:

- A new stack switcher (corosensei) to handle crossing from the Host language to the Wasm world
- Added support for EH frame generation in Singlepass compiler to help with debugging
- Support Dylib Engine with Singlepass
- Wasmer compiled to Wasm/WASI! 🎉
- Upgrade Cranelift to 0.82

> The full Changelog is available here: [https://github.com/wasmerio/wasmer/blob/master/CHANGELOG.md#230---20220606](https://github.com/wasmerio/wasmer/blob/master/CHANGELOG.md#230---20220606)


## A new Stack switcher - Corosensei

Before Wasmer 2.3, WebAssembly calls were using the same stack in the Wasm world as in the host, potentially making it vulnerable to attacks on the stack.

After analyzing a lot of different alternatives, we found that the most popular stack switching libraries in Rust were either unmaintained or dependent on Rust features that were only available on nightly builds:

- [libfringe](https://github.com/edef1c/libfringe)
- [async-wormhole](https://github.com/lunatic-solutions/async-wormhole)

Thanks to [Rust 1.59](https://blog.rust-lang.org/2022/02/24/Rust-1.59.0.html) and its native support for inline assembly, we realized that we could use this new feature to power this new stack switcher implementation.

**So we worked on a new library: corosensei, and the results are impressive.**

Switching stack only took a median of **~3.8ns** in the latest Apple M1 chips. And **~4.2ns** in a powerful AMD Ryzen… which is probably the fastest implementation of a stack switcher that you will find in Rust! (and possibly even in C).

It even supports linked backtraces and panic propagation.

One of the nicest things about creating a new stack switching library is that we are now halfway to supporting async import calls within Wasmer natively using the exact same strategy!

Please check out the corosensei library in [Crates.io](http://crates.io/) for more details!

[crates.io: Rust Package Registry](https://crates.io/crates/corosensei)

## Better support for native backtraces and dylib execution in Singlepass

When Wasmer compiles a WebAssembly program, it can use one of the three available compilers:

- Singlepass (ideal for blockchains)
- Cranelift (ideal for development)
- LLVM (ideal for production)

Singlepass is a compiler that we made in-house to allow blockchains to run smart contracts safely and fast without worrying about JIT bombs.

We previously supported full backtraces with Cranelift; however, Singlepass and LLVM backends lacked this support once traps were triggered.

So after a few customer interviews, we understood that we needed to step up our game with Singlepass.

In Wasmer 2.3, we improved unwinding support with Singlepass to provide better backtraces and made it possible to run Singlepass with the Dylib engine.

## Wasmer compiled to Wasm/WASI! 🎉

Who, in their mind, ever thought that compiling the Wasmer runtime to Wasm was a good idea? We did! Why? We want to enable the compilation of WebAssembly to native entirely done in WebAssembly to use it for our future products.

Now, Wasmer compiles to Wasm/WASI, and we are very excited to show you what you will be able to do with this next. Stay tuned!

And that’s all for the release. If you want to check all the additions, changes, and fixes please don’t hesitate to check our CHANGELOG or reach us:

[https://github.com/wasmerio/wasmer/blob/master/CHANGELOG.md#230---20220606](https://github.com/wasmerio/wasmer/blob/master/CHANGELOG.md#230---20220606)

## Upgrade Cranelift to 0.82

We updated Wasmer to use the latest version of Cranelift. As a result, Wasmer 2.3 fully supports SIMD instructions and uses a new experimental compilation strategy using ISLE. ISLE is a new domain-specific language (DSL) for instruction selection and machine-code lowering created by the Cranelift team.

# About Wasmer

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
