---
title: 'Wasmer can now run in RISC-V'
excerpt: 'Wasmer can now run in RISC-V.'
date: '2022-09-09T12:00:00.000Z'
author: Tesi Lopez
published: false
---

And the best of it... it has been fully worked on by our community. Mad props from the Wasmer team to Toru Nayuki who has been driving this effort from start to end.

Wasmer is a server-side runtime that enables running software anywhere via WebAssembly. RISC-V is a promising new standard for chipset instructions that will open new doors on management and evolution of instructions, so vendors are not tied to a chipset maker timeline.

Everything started on January 18th, 2022 (really, just a few weeks ago).

Toru Nayuki, ‣ opened the issue for supporting Wasmer in RISC-V.

He wanted to run WAPM software easily on his brand new HiFIve Unmatched development board.

But Wasmer was not yet supported there... so Toru began the quest.

What was needed in order to have RISC-V supported?

Thanks to our production-ready LLVM-based compiler, running Wasmer in RISC-V only required

## How you can use it

The best thing of all is that you don’t need a RISC-V package to try it.

You can pre-compile any package from your laptop or your ARM chipset to RISC-V:

```bash
wasmer compile --llvm --dylib mypackage.wasm --target=riscv64 -o mypackage.dylib
```

And then just simply run it there with wasmer-headless

```bash
wasmer-headless run 
```