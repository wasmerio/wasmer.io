---
title: 'Wasmer 3.2'
excerpt: 'Wasmer 3.2'
date: '2023-04-18T12:00:00.000Z'
author: Sébastien Chevalier
published: false
---

Today we are incredibly excited to announce the release of [Wasmer Runtime v3.2](https://github.com/wasmerio/wasmer/releases/tag/v3.2.0).

This release has been in the oven for a few months. Here are the main highlights:

- Support for RISC-V chipsets
- WASI improvements
- Stable WCGI support
- New Runner Architecture
- Refactored Type API

You can read the full changelog here: [CHANGELOG.md](https://github.com/wasmerio/wasmer/blob/master/CHANGELOG.md#320---18042023)

## Support for RISC-V

One of the main promises of WebAssembly is to run software anywhere, with no boundaries regarding the Operating System (Windows, Linux or macOS) or the chipset (x86_64, ARM64, …). On that front, we have worked for over a year on adding support for RISC-V.

We would like to give a big shoutout and thanks to [Toru Nayuki](https://github.com/tnayuki), who created the [initial implementation PR](https://github.com/wasmerio/wasmer/pull/2800) that sparked our interest in RISC-V.

A few months after the initial PR was opened, we were able to get our hands on a RISC-V board. And some tests and dependency updates later, today we are very excited to see how anyone can now Wasmer fully in RISC-V chipsets! (with both of our compilers: Cranelift and LLVM!)

<video width="960" height="720" controls preload="auto" autoplay loop muted>
  <source src="/images/blog/wordpress-on-riscv.mp4" type="video/mp4">
</video>

> PHP & Wordpress running with Wasmer in RISC-V

Download the executable for Linux RISC-V from Github:

[https://github.com/wasmerio/wasmer/releases/download/v3.2.0/wasmer-linux-riscv64.tar.gz](https://github.com/wasmerio/wasmer/releases/download/v3.2.0/wasmer-linux-riscv64.tar.gz)

Or use the Wasmer installer:

```bash
curl https://get.wasmer.io -sSfL | sh
```

## WASI Refactor

WASI codebase has been improved greatly, we fixed multiple issues and made the system more stable overall.

Wasmer WASI is reaching production maturity. Most of WASI programs now work without an issue with a high-performance throughput.

We also added extra testing coverage with basic programs to assure that compatibility is kept over time as WASI evolves.

## Official WCGI support

A few weeks ago, we announced support for a new standard: WCGI. Now this support lands officially in the stable Wasmer release.

Feel free to read more about WCGI here: [https://wasmer.io/posts/announcing-wcgi](https://wasmer.io/posts/announcing-wcgi)

## New Runner Architecture

Wasmer now allows defining custom runners when creating commands for packages in the `wasmer.toml` manifest.

But, why this is useful?

Runners allow users to define the behavior on how they want to run Wasm modules: WCGI programs will run it with the `wcgi` runner, and WASI ones with the `wasi` runner.

For example, for running wasi, the `wasmer.toml` will look something like:

```toml
[[command]]
runner = 'wasi'
name = 'mycommand'
module = 'module'
```

Or, for running the command with WCGI:

```toml
[[command]]
runner = 'wcgi'
name = 'mycommand'
module = 'module'
```

## Refactored Type API

We have done incredible effort trying to make our codebase and type system simpler and more reliable.

As part of that effort, we refactored the `js` and `sys` feature APIs so the types used in both implementations are now unified across common types and no longer duplicated.

This effort paves the way to allow using other runtimes under the hood with the same Wasmer API everyone loves and uses.

Stay tuned for more updates on this front soon!

Please let us know your thoughts in [Twitter](https://twitter.com/wasmerio), Reddit and Hacker News :)
