---
title: "Wasmer 2.2: Major Singlepass Improvements"
excerpt: "Wasmer 2.2: Major Singlepass Improvements"
date: "2022-02-28T00:00:00.000Z"
author: Syrus Akbary
published: true
---

The upcoming Wasmer 2.2 release features significant advancements shaping up to impact our Web3 and blockchain community in a big way. Wasmer is reintroducing Aarch64 compatibility for our Singlepass compiler. With the newly overhauled Singlepass, Web3 and blockchain developers can efficiently run Wasmer Runtime with Singepass on Windows, Linux, and macOS. The new release also fully supports the much anticipated Apple M1 processor.

> **Special thanks to our sponsors:** Interchain Foundation, Confio GmbH, Near, Terra, Spacemesh, and Hot-G.
> 

Keep reading to learn how the new version stacks up against the previous and take advantage of it.

## Faster is better. Let's dig in a bit on performance benchmarks.

There are many ways to measure "performance,"  like security, compilation speed, or code execution time, to name a few. For this article, we selected execution speed with ***CoreMark***®, an industry-standard benchmark that measures the performance of central processing units (CPU) and embedded microcontrollers (MCU).

CoreMark compiles to a WebAssembly program and returns a single number representing a CoreMark score for generated code efficiency; the higher the number, the better. To help contextualize the results, we'll test Singlepass against the previous v0.17 release and the Cranelift compiler.

### Linux x86_64** **Benchmarks

First, we'll create a baseline measurement on an x86_64 PC running Linux with three different versions of Wasmer (v0.17, v1.02, and v2.2) to see how singlepass and cranelift have evolved.

With a simple command: `./wasmer run coremark.wasm --disable-cache --singlepass` or `./wasmer run coremark.wasm --disable-cache --cranelift`, we execute the benchmark. Caching is disabled as it could interfere with the test and return an inaccurate measurement.

|  | v0.17 | v1.02 | v2.2 |
| --- | --- | --- | --- |
| Singlepass | 5150.720934 | 6458.199320 | 6485.429224 |
| Cranelift | 7060.573177 | 7197.098826 | 13664.480261 |
| LLVM | 14409.921842 | 15471.242202 | 16751.259550 |

The results are impressive. Singlepass performance between v0.17 and v2.0 has increased by ~25%, and Cranelift has nearly doubled its performance with an increase of ~90%.

**Linux ARM64** **Benchmarks**

We executed the same test using a simple ODroid N2 SBC with the following Aarch64 results.

|  | v0.17 | v1.02 | v2.2 |
| --- | --- | --- | --- |
| Singlepass | 708.086147 | N/A | 2514.896935 |
| CraneLift | N/A | 4609.121989 | 7225.574132 |
| LLVM | N/A | N/A | 7992.215658 |

The results are interesting and still impressive. Both Cranelift and Singlepass have gaps in Aarch64 compatibility with Wasmer v0.17 and v1.02, respectively. Compared to x86_64, Cranelift underperformed; however, it improved performance by **1.5x** compared to Wasmer v1.0. On the other hand, the big winner is Singlepass, with a performance improvement of **3.7x** compared to Wasmer v0.17.

### macOS M1** **Benchmarks

Let's be honest, M1 results are the real reason you're still reading!

Without further ado...

|  | v2.2 |
| --- | --- |
| Singlepass | 11490.887496 |
| Cranelift | 27183.440174 |

We have to acknowledge that the M1 Chip is insanely powerful, and the numbers are just ridiculously better! We can only showcase Wasmer v2.2 results here, but a similar ratio between Singlepass vs Cranelift speed of execution can be see.

### Compilation time

Singlepass compiled programs might lag on execution performance compared to the other compilers, but it outperforms LLVM and Cranelift with linear compilation speed. LLVM and Cranelift perform many optimizations to get the most performance out of a WebAssembly program. As a result, they are subject to extraneous compilation times of JIT bombs. With singlepass, there are no surprises, your system won't suddenly explode if the file gets too complex.

Let’s prove it with “TiDB in wasm”. The wasm file is a massive 70MB wasm that contains a full SQL Engine. To benchmark this, we’ll use this command line (on Linux / macOS) `time ./wasmer run main.wasm --singlepass --disable-cache -i blah`

The `-i blah` is a trick to not actually run the TiDB interpreter (as you need to “ctrl-c” to exit it), so the time measured will only be the compilation time. You can download that file there: 

[](https://registry-cdn.wapm.io/contents/lucklove/tidb/0.1.6/main.wasm)

Here is the result of the benchmarks, the “real” part of time (the lower, the better), on wasmer v2.2 across a few different hardware:

|  | linux x86_64 | linux Arm64 | macOS Arm64 |
| --- | --- | --- | --- |
| Singlepass | 0m3.844s | 0m7.361s | 0m1.333s |
| Cranelift | 10m12.101s | 34m52.492s | 3m9.26s |
| LLVM | stopped after 3h | stopped after 3 days | N/A |

So here, we have a massive difference in compile-time, with Singlepass being 140 to 160 times faster than Cranelift, and even more, compared to LLVM. Here, the simpler approach of Singlepass, which doesn’t try to optimize register allocation, pays off!

## What's Next

The Wasmer 2.1 release introduced a refactor of the Singlepass compiler to enable a new straightforward backend implementation. With Aarch64 compatibility, Singlepass is more flexible, powerful, and generally more useful. However, it still needs to be tested in the wild against production workloads and scenarios. There is where you and the rest of the community can help--download Wasmer 2.2 and the latest Singlepass release candidate and let us know how it works for you. You can reach us on our Slack community channel to provide feedback or discuss your use case.
