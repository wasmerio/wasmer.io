---
title: Wasmer 2.0, It's a big deal!
description: 'Announcing the general availability of the Wasmer 2.0'
publishedAt: '2021-06-02T15:35:07.322Z'
author:
  name: 'Syrus Akbary'
  picture: '/images/syrus.png'
status: 'published'
---

It's been almost 6-months since we released Wasmer 1.0, and the community support and reception were incredible. Since then, we've been hard at work on the next version of Wasmer.

**Today, we're pleased to announce the general availability of Wasmer 2.0!**

Can't wait to try it? _Go ahead!_

```bash
curl https://get.wasmer.io -sSfL | sh
```

Or visit our repo: [github.com/wasmerio/wasmer](https://github.com/wasmerio/wasmer)

![/images/wasmer-20.jpg](/images/wasmer-20.jpg)

### 2.0... A tale of Edge Cases, Engineers, and Semantic Versioning.

Wasmer 2.0 is packed full of new features that add stability, security, and performance improvements. **All public APIs remain the same**, with a few exceptions on internal APIs that will not affect 99% of current users. However, passionate discussions within the engineering team about semantic versioning pushed us towards 2.0.

*Breaking changes:* Wasm Modules serialized with Wasmer 1.0 cannot be deserialized with Wasmer 2.0.

## What's New in 2.0

Our goals for Wasmer 2.0 are to provide the community with immediate value and set up the runtime to support future value. The main additions to the latest release include SIMD and Reference Types. Let's dive into the details.

### SIMD

SIMD stands for single instruction, multiple data. In short, SIMD enables one instruction to operate on numerous pieces of data at the same time. The introduction of SIMD into Wasmer 2.0 empowers the community with higher performance data-level parallelism for many different use cases. Users creating machine-learning, video (transcoding, encoding, decoding...etc.), image processing, 3D physics, or graphics applications should see a significant boost in performance. Perhaps an underappreciated benefit of SIMD is its potential for reducing the energy signature of your applications.

### Reference Types

Another prominent feature for Wasmer 2.0 is the inclusion of reference types. For the uninitiated, Reference Types allow Wasm modules to reference and share specific types of information with host environments or between multiple Wasm modules.

This allows for much simpler code to interact with a Wasm module from the host, and is a key feature to enable future proposals like Interface Types.

We will talk about this further in future blog posts.

## Performance Improvements

It wouldn't be a new release without shiny performance improvements. The only thing we like as much as security is performance!

If you decided to switch to Wasmer 2.0 from Wasmer 1.0, you would notice the difference.

- LLVM runtime speed is around ~50% faster when operating with floats (thanks to optimal management of _NaNs_)
- Function calls are now much, much quicker, avoiding kernel interaction when possible (thanks to `sigsetjmp` and `siglongjmp`)
- Cranelift runtime speed is 40% faster, thanks to their new backend architecture
- Deserialization time is very, very fast.

![/images/llvm-runtime-performance.png](/images/llvm-runtime-performance.png)

![/images/cranelift-runtime-performance.png](/images/cranelift-runtime-performance.png)

![/images/deserialization-performance.png](/images/deserialization-performance.png)

If you're new to the Wasmer community, you'll be delighted with the incredible performance that you can achieve with Wasmer 2.0, bringing your Wasm programs and libraries very close to native speeds.

## Housekeeping Items

Aside from all of the improvements, we also realized that the current engine names were not providing the best context for how they work under the hood, so we decided to improve them!

The engines have new names:

- JIT → Universal (default)
- Native → Dylib (as an acronym to Dynamic Library)
- Object File → StaticLib (as an acronym to Static Library)

## What's next

We've packed in many features that help with the stability, security, and performance of WebAssembly applications. However, we're far from done. Future releases of the Wasmer Runtime will continue to build on the work we implemented for Reference Types, add more security, performance, and of course, continue to add support for more operating environments and hardware infrastructures.

## Our Commitment to Open Source and the WebAssembly Community

As WebAssembly continues to grow and thrive, we plan to double down on our commitment to the WebAssembly community and our mission to make WebAssembly universally available. We plan to implement a more open and transparent development process for future releases of the Wasmer Runtime on GitHub with milestones.

### You Can Help

There are now multiple ways the community can actively help with our mission.

1. Keep downloading and using Wasmer
2. Provide as much feedback as possible to help make future release better or contribute directly with pull requests
3. Become a sponsor and help fund future development by donating to our [Open Collective](https://opencollective.com/wasmerio) page.

#### About Wasmer

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.
