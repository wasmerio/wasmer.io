---
title: "Wasmer 2.1"
excerpt: "Wasmer 2.1 supporting JS, Singlepass in Windows, iOS, LLVM 13, reproducible builds and many more features"
date: "2021-12-01T00:00:00.000Z"
author: Syrus Akbary
published: true
---

After a few months of work, we are super happy to announce the general availability of Wasmer 2.1. Packed with amazing new features and bug fixes, including:

- Wasmer JS
- Virtual Filesystem
- iOS Support
- Singlepass support in Windows
- LLVM ARM64 support & LLVM 13
- Faster Singlepass compilation
- Reproducible and deterministic builds
- New language integrations: Lisp and Crystal

Wasmer 2.1 also kicks off the company's transition to a milestone-driven public roadmap and delivery process

*[Click here](https://github.com/wasmerio/wasmer/milestones) for more information on current and future milestones.*

Below is a summary of some new features and highlights.

## Wasmer-JS

The new release of `wasmer-js` leverages the Wasmer WASI Rust implementation thanks to `wasm-bindgen`. As a result, we offer seamless cross-platform support for WebAssembly applications that leverage the exact WASI implementation in the browser or on the server, including platforms like Node.js or Deno using `js-default`.

You can now run in the browser your Rust projects using Wasmer just by doing:

```toml
[dependencies]
wasmer = { version = "2.1.0", default-features=false, features=["js-default"]}
```
**Stay tuned for a detailed blog post on how to use it!**

## Virtual Filesystem

In order to run Wasmer and WASI on Javascript environments where the access to the host filesystem is limited,
we created a in-memory filesystem that allows running WASI literally anywhere.

This approach is similar to the popular JS package [MemFS](https://www.npmjs.com/package/memfs), but [fully implemented in Rust](https://github.com/wasmerio/wasmer/tree/master/lib/vfs).

## iOS Support

Due to App Store JIT compiler restrictions, building WebAssembly components for iOS required pre-approval from Apple or users manually installed the modules on devices. With Wasmer 2.1, you can precompile a `.wasm` into a `.dylib` and then load it using the Dylib Engine at runtime. No App Store pre-approval is required. You can find a complete example here:

[https://github.com/wasmerio/wasmer/tree/master/tests/integration/ios/DylibExample](https://github.com/wasmerio/wasmer/tree/master/tests/integration/ios/DylibExample)

## Singlepass Windows Support

The Wasmer Runtime and its Singlepass compiler are fast becoming secret weapons for blockchain companies and Web3 infrastructure providers. Companies and sponsors using Wasmer and Singlepass as a part of their infrastructure include [Near Protocol](https://near.org/), [Confio](https://confio.gmbh/), [Spacemesh](https://spacemesh.io/), Dusk Network, ElrondNetwork, etc. With Wasmer 2.1, our customers and sponsors can seamlessly leverage Singlepass on any Windows infrastructure.

## LLVM Aarch64 support

Before Wasmer 2.1, the Dylib engine was the only option for LLVM. Additional support for more relocations in our Universal Engine makes it trivial to compile and run LLVM on Aarch64.

## LLVM 13

We have upgraded the LLVM version from 11 to 13. It has some notable improvements regarding compilation speed with the new pass manager.

[https://twitter.com/ryan_levick/status/1443202538099073027](https://twitter.com/ryan_levick/status/1443202538099073027)

You can check the complete list of improvements for LLVM 13 and 12 here: [https://releases.llvm.org/13.0.0/docs/ReleaseNotes.html](https://releases.llvm.org/13.0.0/docs/ReleaseNotes.html) [https://releases.llvm.org/12.0.0/docs/ReleaseNotes.html](https://releases.llvm.org/12.0.0/docs/ReleaseNotes.html)

## Faster Singlepass Compilation

Thanks to contributions by one of our sponsors, [NEAR Protocol](https://near.org/), compilation time with Wasmer's Singlepass compiler is up to 10x faster when compiling tons of functions with a small body. Leveraging VecAsssmbler from Dynasm-rs, we eliminated the need to make a system call to add newly created functions into memory.

## Deterministic Builds

Deterministic builds are a critical feature for many of our customers in the Web3 space. Users can trust that `wasmer compile` generates identical reproducible artifacts for a given compiler/engine.

## New language integrations!

We couldn't be happier about the new language integrations of Wasmer created by our awesome community.
The integrations allow developers to WebAssembly in even more languages:

* [Wasmer Lisp](https://github.com/helmutkian/cl-wasm-runtime): Were you interested in using WebAssembly from a functional language? This is for you!
* [Wasmer Crystal](https://github.com/naqvis/wasmer-crystal): [Crystal](https://crystal-lang.org/) is a Ruby-like language with C-like performance

# Install Wasmer now

If you already have Wasmer installed, you can upgrade to 2.1 by running

```shell
wasmer self-update
```

If you are installing Wasmer for the first time, you can use one of the methods listed below:

```shell
# Using Shell (macOS and Linux):
curl https://get.wasmer.io -sSfL | sh

# Using PowerShell (Windows):
iwr https://win.wasmer.io -useb | iex

# Using Homebrew (macOS):
brew install wasmer

# Using Scoop (Windows):
scoop install wasmer

# Using Chocolatey (Windows):
choco install wasmer
```

---

The full release notes, including bug fixes, can be found at: [https://github.com/wasmerio/wasmer/releases/tag/v2.1.0](https://github.com/wasmerio/wasmer/releases/tag/v2.1.0)

If you're interested in becoming an Open Source Sponsor or for information on our sponsorship program, [click here](https://wasmer.io/wasmer-open-source-program).

[HN Comments](https://news.ycombinator.com/item?id=29414196)
