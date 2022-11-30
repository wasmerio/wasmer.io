---
title: "Announcing Wasmer 3.0"
excerpt: "Announcing Wasmer 3.0"
date: "2022-11-23T12:00:00.000Z"
author: Syrus Akbary
published: true
---

Today we are very excited to launch Wasmer 3.0, following three months of work since our first alpha.

So, what’s new in Wasmer?

- `wasmer` is now able to run WAPM packages directly via `wasmer run`
- Better API and memory management
- We have simplified the way engines work. Now, only one engine is needed (although the engine might use different artifacts to load/store code)
- Zero-copy deserialization of artifacts
- Support for creating native executables for any platform
- Enable multi-value in singlepass compiler
- WASI improvements

# `wasmer run`

Wasmer run, now on steroids. You can now pass any package published to [wapm.io](http://wapm.io) to the wasmer cli! 🎉 

For example, `wasmer run python/python` will download and run directly the python package from the [wapm.io](http://wapm.io) package registry. 

![The wasmer CLI running python in the Warp terminal](/images/blog/wasmer-run-warp.png)

> The wasmer CLI running python in the [Warp terminal](https://www.warp.dev/)!

This greatly simplifies the flow for running WASI executables from WAPM with wasmer.

## Better API and Memory Management

The Wasmer Rust API has been rebuilt from the ground up.

Thanks to the new API and memory management style, we can now safely store Wasm objects in the Store.

Please check the Wasmer 3.0 Migration Guide to read how to upgrade to 3.0 from 1.0 or 2.0:

[https://github.com/wasmerio/wasmer/blob/master/docs/migration_to_3.0.0.md](https://github.com/wasmerio/wasmer/blob/master/docs/migration_to_3.0.0.md)

We also introduced a new `MemoryView` (similar to JS), and we brought wasmer-js (which run Wasmer in the browser with wasm-bindgen) to feature parity with wasmer-sys (running Wasmer natively)

## Simplified Engines

Wasmer previously had the concept of different engines: dylib, universal, and more.

We have simplified all the engines into one to enable easier code reuse.

## Zero-copy Deserialization

We are now using [rkyv](https://github.com/rkyv/rkyv) for zero-copy deserialization of build artifacts.

This has significantly improved startup performance!

## Create Native Executables from Wasm… now including Windows!

As reviewed in previous blog posts, we revamped the `create-exe` subcommand in Wasmer.

Wasmer can now turn a WebAssembly file into a native Windows, Linux or Mac OS executable.
This enables distributing executables to users, without requiring them to install Wasmer themselves.

This functionality is implemented on top of [Zig's](https://ziglang.org/) cross compilation abilities.

You can learn more about how `create-exe` works here:

[https://wasmer.io/posts/wasm-as-universal-binary-format-part-1-native-executables](https://wasmer.io/posts/wasm-as-universal-binary-format-part-1-native-executables)

And how we integrated it into WAPM here:

[https://wasmer.io/posts/wasm-as-universal-binary-format-part-2-wapm](https://wasmer.io/posts/wasm-as-universal-binary-format-part-2-wapm)

## Singlepass Compiler Improvements

The most popular compiler for blockchains got a lot of new improvements:

- Support for multi-value functions
- Improved robustness of the Singlepass compiler
- Added support for exception handling frames
- …and many more fixes and improvements (specially regarding performance!)

## WASI Improvements

Wasmer WASI implementation is becoming more mature. We fixed multiple bugs with the file system and reworked its inner types with WebAssembly Interfaces (WAI). This enables new capabilities, which we will introduce in future.

Stay tuned for some updates on WAI soon!

---

Install the latest version of the Wasmer CLI and let us know your thoughts!

```bash
curl https://get.wasmer.io -sSfL | sh
```
