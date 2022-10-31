---
title: 'WebAssembly as a Universal Binary Format (Part I: Native executables)'
description: 'WebAssembly as a Universal Binary Format (Part I: Native executables)'
publishedAt: '2022-08-08T12:00:00.000Z'
author:
  name: 'Syrus Akbary'
  picture: '/images/syrus.png'
status: 'published'
---

At Wasmer, we have worked tirelessly on making WebAssembly as widely adopted as possible.

One of the things we identified that could help broaden the adoption is using the Wasm binaries to create native executables for any given platform or chipset, so **WebAssembly can really become the lingua franca for all the software applications out there**.

![/images/wasm-universal-binary.png](/images/wasm-universal-binary.png)

Given a `program.wasm`, we could ideally generate native binaries (that don’t depend on any kind of compilation at runtime) that run anywhere:

- Windows: `program.exe`
- macOS: `./program` (Mach-O 64-bit executable x86_64)
- macOS (Apple Silicon): `./program` (Mach-O 64-bit executable arm64)
- Linux: `./program` (ELF 64-bit executable x86_64)
- Linux (ARM): `./program` (ELF 64-bit executable aarch64)

A binary that is completely sandboxed and with minimal runtime overhead.

All that we presented is not just a theoretical idea …it’s already fully working in the latest release of Wasmer (3.0.0-beta) 🎉

In this article we will review how we made this possible (thanks to static objects, Zig, and a lot of love!).

> There has been similar alternatives, like the great **αcτµαlly pδrταblε εxεcµταblε** (ape in short) from [Justine](https://justine.lol/ape.html) to generate multi-platform x86 binaries, or [GraalVM](https://www.graalvm.org/) to generate native executables from Java bytecode.
> We’ll review them in the Part II of this article series.

## 🚀 First, let’s try it out!

> If you want to try this on your laptop, please make sure you have the latest beta version of Wasmer installed.
>
> `curl https://get.wasmer.io -sSfL | sh -s "3.0.0-beta"`

First, let's download wasm2wat.wasm from wapm:

```bash
$ curl https://registry-cdn.wapm.io/contents/_/wabt/1.0.12/out/wasi/wasm2wat.wasm -o wasm2wat.wasm
```

Let's use create-exe (_it requires Zig or Clang installed in your system, and Wasmer 3.0.0-beta1_):

```bash
$ wasmer create-exe wasm2wat.wasm -o ./wasm2wat
```

Now, let's execute the `wasm2wat` standalone binary!

```
$ ./wasm2wat
usage: wasm2wat [options] filename

Read a file in the WebAssembly binary format, and convert it to
  the WebAssembly text format.

examples:
  # parse binary file test.wasm and write text file test.wast
  $ wasm2wat test.wasm -o test.wat
```

> Note: the wasm2wat binary will actually work standalone in the platform without requiring to have Wasmer installed at all, and it will also be completely sandboxed by default.

### Why this is useful?

As new chipsets are being added and used in the ecosystem (ARM, RISC-V), we need to ensure current tools continue working with them.

If CLI tools start targeting WebAssembly as their end target, we can let **Wasmer automatically generate native executables for each platform and chipset**, so when new chips and OSS appear, we don’t need to worry about recompiling again our software. They will just simply work.

Apart from this, native binaries are automatically sandboxed and do not have any permissions into the underlying OS unless explicitly determined, making them much safer than the normal binaries we use daily.

## 🔮 How the `create-exe` black magic works?

In a nutshell, this is what happens under the hood when calling `wasmer create-exe`: we convert the Wasm to a static object file, generating a C header file to help the linker link the Wasm exported functions with the compiled object file symbols, and then we use a C compiler/linker file to join everything together: the static object (generated from the Wasm file), a minimal libwasmer.a (headless, with no compilers) and the WASI glue code.

Now, let’s get into some depth on how we made this possible:

1. First, we adapted the engine, allowing Wasmer load code directly from native objects-symbols that are linked at runtime.
   The Engine first generates a native object file for a given .wasm file (`.o` in Linux / macOS or `.obj` in Windows).
2. Once the object file is generated, we generate a header file that links its contents to certain variables at compilation time and plugs them into the Engine with [`Engine::deserialize_object`](https://github.com/wasmerio/wasmer/blob/master/lib/compiler/src/engine/artifact.rs#L657).
3. And once that happens, we just need to use the Wasm-C-API that we all love to interact with this Wasm file!

<aside>

**ℹ️ Fun fact: you can use the Wasm-C-API that you know and love to customize this behavior and create your custom binary!**

</aside>

## ⚡️ Zig for Cross-Compilation

In Wasmer 3.0 we used the power of [Zig](https://ziglang.org/) for doing cross-compilation from the C glue code into other machines.

This made almost trivial to generate a for macOS from Linux (as an example).

```bash
$ wasmer create-exe wasm2wat.wasm --target=x86_64-darwin -o ./wasm2wat
$ file ./wasm2wat
./wasm2wat: Mach-O 64-bit executable x86_64
```

So by default, if you are cross-compiling we try to use `zig cc` instead of `cc` so we can easily cross compile from one machine to the other with no extra dependencies.

---

With all these awesome features, we already started the integration of native executables in the Wasmer ecosystem.

Please read the Part II of the article series to see how we integrated the Native Executables into the WebAssembly Package Manager: [WAPM](https://wapm.io):

[WebAssembly as a Universal Binary Format (Part II: WAPM)](https://wasmer.io/posts/wasm-as-universal-binary-format-part-2-wapm)
