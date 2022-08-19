---
title: 'WebAssembly as a Universal Binary Format (Part II: WAPM)'
excerpt: 'WebAssembly as a Universal Binary Format (Part II: WAPM)'
date: '2022-08-18T12:00:00.000Z'
author: Syrus Akbary
published: true
---

In the [first part](https://wasmer.io/posts/wasm-as-universal-binary-format-part-1-native-executables), I demonstrated how you can create standalone executable files from WebAssembly WASI files, that will work in any operating system; which means we can create a `trealla.exe` (or `trealla.out`) from a `trealla.wasm` file, without depending on any WebAssembly Runtime at all (see [Trealla package on WAPM](https://wapm.io/guregu/trealla))!

This was great and very well adopted by the community, but we were missing one big part of the picture: how can we use this new feature to improve the life of developers?

*TL;DR for the lazy readers: all WASI packages published to WAPM will have a native executable distribution for each chipset and platform… automatically!*

![Executables in the Trealla WAPM package page](/images/blog/wapm-native-executables.png)
> Executables in the [Trealla WAPM package page](https://wapm.io/guregu/trealla)

But… why this is useful for the developers and tech companies?

First, let's analyze some of the problems when distributing applications to your users:

## Creating a binary for each platform sucks… and sucks big!

Right now, if you are using Rust, Go, Zig or C/C++ (among others) you will usually need to install a whole toolchain/SDK to create a binary for each platform (Ok, not in *all* cases: Go and Zig handle this very elegantly by owning almost every part of the stack and hiding the complexity away from the user).

But in summary: creating binaries for each platform is painful and it takes time. Why? You need to:

1. Find the toolchain (for example, it might not exist... Try to generate a macOS executable from a Linux system for a C project!)
2. Install the toolchain in your system (in some cases the toolchains will only run in a specific platform/chipset, so you will also need to set up a VM to run the toolchain)
3. Adapt some of your application code to make sure it works properly in the desired operating system
4. Generate a binary
5. Repeat for each platform and hope it works!

Also, what about doing this retroactively? Let's say you created an application 2 years ago that was able to run on an Intel chipset... how you can make the same old software now run on ARM? You need to recompile everything, making sure the old dependencies used are still available in your current system and hoping that the compilation will be merciful with you and no compilation errors have to be fixed for the new target.

### Portable Executables

To date, there are some very cool ways that people have been using to solve this (portable executables).

One way has been via ape/cosmopolitan, as it allows to create executables that are “αcτµαlly pδrταblε εxεcµταblε”:

[https://justine.lol/ape.html](https://justine.lol/ape.html)

So, how is this approach different? ape is aiming to create one standalone binary that works everywhere (same chipset, x86 as lingua franca). On the other hand, Wasmer aims to have one standalone lingua franca (Wasm), that can target multiple OSes (macOS, Linux, Windows), chipsets (x86, ARM, RISC-V) and programming languages (Python, Rust, Go…).

On one hand, both ape and Wasmer rely on a “universal binary interface” to interact universally with the Operating System: [Cosmopolitan](https://github.com/jart/cosmopolitan) (as a universal libc POSIX interface) in the case of ape, and WASI in the case of Wasmer.

On the other hand, since Wasmer relies on WASI it can also offer a full-sandboxed execution when running the binary (this means that by default no files or sockets could be accessed or created by the binary unless explicitly allowed, for example).

To sum up: one Wasm WASI file generates a sandboxed binary for each of the items of the OS/chipset matrix.

## Distributing binaries is painful

Even once you created multiple binaries, you still need to distribute them and make sure they are accessible for people to use.

One way most developers use is Github Releases. Here’s how WABT (a WebAssembly binary toolkit with multiple executable utilities) used Github for their latest release ([version 1.0.29](https://github.com/WebAssembly/wabt/releases/tag/1.0.29)):

![Wabt in Github Releases](/images/blog/wapm-native-executables-github-releases.png)

However, this approach usually means integrating the “Build process” inside of your CI process. That is, you have to build it from multiple operating systems.

Furthermore, while Github is great, it all evolves around the source code, which requires a whole toolchain to be able to build a binary (please read the “**Creating a binary for each platform sucks**” section we showcased before).

Not only that… **if we look closely we can see that `wabt` is missing the binary for the new macOS ARM chipsets** (M1/M2)!

At Wasmer, we believe there are better ways of distributing software, in a way that is still universal for any package and completely agnostic of the toolchain needed, so you can retroactively create new binaries for the same software when new targets emerge.

<aside>
ℹ️ Other package managers (such as brew) have solved this problem in a great way (via formulas and bottles - which are just precompiled packages), however with Wasmer you don't even need an SDK or framework dependencies to create bottles for each platform!
</aside>

# WAPM

First, we identified all the packages from WAPM that are possible to create as standalone applications (WABT tooling, Python, PHP, ...).

Then, for any WASI package uploaded to WAPM we automatically create and publish standalone binaries for each of the platforms that Wasmer supports, so people can start using your software right away (now, or in the future: **you will no longer need to keep track of dependencies, supported platforms or chipsets**!).

So, if you are using trealla, there is a `trealla.wasm` WASI file that you can run either via Wasmer (requiring you to install it), or in a completely standalone way!

<video width="960" height="720" controls preload="auto" autoplay loop muted>
  <source src="/images/blog/wapm-native-executables.mp4" type="video/mp4">
  <source src="/images/blog/wapm-native-executables.mov" type="video/quicktime">
</video>

So, you are in Windows? → trealla.exe on Windows (coming soon!)

You are using the new macOS M1 machines? → [trealla-apple-arm64-0.1.2.tar.gz](https://registry-cdn.wapm.io/distribution/exe/guregu/trealla/trealla-apple-arm64-0.1.2.tar.gz)

You are in Linux? → [trealla-linux-x86_64-0.1.2.tar.gz](https://registry-cdn.wapm.io/distribution/exe/guregu/trealla/trealla-linux-x86_64-0.1.2.tar.gz)

We believe Wasmer will make every package developers target WebAssembly first, and let WAPM and Wasmer target every operating systems and chipsets automatically. No more effort is required for the developer… Welcome to the new world order!
