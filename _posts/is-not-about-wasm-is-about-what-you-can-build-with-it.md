---
title: "It’s not about Wasm, its about what you can build with it!"
excerpt: "It’s not about Wasm, its about what you can build with it!"
date: "2023-03-06T18:00:00.000Z"
author: Syrus Akbary
published: false
---

This article is an open reflection on the importance of thinking of **technology as an enabler** to new products and horizons, **and not as a driver itself**. On this article I’ll review how I’ve fallen on the mistake of prioritizing tech over product many times and how I got back delivering value by focusing back on the customer.

If the long-term opportunities enabled by some technology advancement are greater than the short term gains enabled by the product powered by the technology, you may easily get blinded by the technology itself (very relatable to AI nowadays, isn’t it?).
So it’s very critical, specially for startups, to find the right balance between short and long term thinking (product vs tech).

> Growth it’s about focused short term imbalance to achieve long term balance.
> 

*I encourage the reader to read the following article that has a similar take on the uses of technology over product deliverables: [You should not be using AWS. Probably.](https://www.karlsutt.com/articles/you-should-not-be-using-aws/)*

## A Wasmer story tale

Wasmer started as a need I myself had. I maintained the [GraphQL Python](https://github.com/graphql-python) ecosystem, and while maintaining it we spent uncountable time trying to backport features from the reference JS API into the GraphQL Python codebase.

After analyzing the whole GraphQL ecosystem, I realized that the same process was repeated N+1 times in different languages (bonus points if you got the [dataloader reference](https://github.com/graphql/dataloader)!): GraphQL-Go, Juniper/GraphQL-Rust, GraphQL ruby, … they all were porting the JS reference API to different languages! (how suboptimal, right?).

So I thought Wasm could solve this use problem way more elegantly: one universal library that can be used in any programming language (***here we go, here’s Wasmer first product use case!***).

However, as I dug more and more on the ecosystem I realized that Wasm could become way more powerful than what I initially thought: once you remove the barriers for running software anywhere, all software ecosystems just suddenly become part of your arena.

Back when I was playing with the idea, there was not an easy way to run a Wasm module in in my favorite language… so I started Wasmer as a WebAssembly runtime to improve the ergonomics on using software anywhere.

### Embracing the struggle

And so I started dreaming…

Wasmer *will* have the opportunity to be in the middle of how software is run in the future… in any startup, small or big enterprise! Cloud, Edge and even Web3 computing, as packages, or embedded. Running in IoT devices, antennas, CDNs or browsers… Wasmer will be everywhere!
*Note: I still believe this to be true, but I try to do my best to not get blinded by it.*

This immense window of opportunity actually made us spend time on the long tail of possibilities rather than focusing on the short term product fit. To put it nicely: we lost direction and that almost killed the company (among with other remarkable mistakes).

But when there’s struggle, there are learnings… and those learnings in the last years turned out to be highly valuable for us.

---

## Technology or Product?

How many of you know what [namespaces](https://en.wikipedia.org/wiki/Linux_namespaces), [cgroups](https://en.wikipedia.org/wiki/Cgroups) or [LXC](https://en.wikipedia.org/wiki/LXC) are?

Probably not that many, but if I ask if you know what **Docker** is I bet my horses that most of you will know what I’m talking about (to some degree).

You may not know this, but Docker *used* all of the technologies I previously mentioned to build one thing that completely dominated the computing ecosystem: a CLI app with great ergonomics to containerize applications that run in any place in the cloud easily. It was not about LXC, cgroups or namespaces… it was about the *ONE* product that delivered them cohesively in a masterpiece software and ultra-polished experience for the developer.

But lets continue with the same rhetoric: how many of you know what Emscripten, WebGL or Wasm are, but… did you know that a $20B company was created by taking advantage solely on this technologies: [Figma](https://www.theverge.com/2022/11/8/23445821/figma-adobe-acquisition-design-vr-ai-meta)?

From this examples it’s easy to realize that Technology ≠ Product, although the former always enable great advancements on the latter. So a great product must have great technology to shine on the long term, but a great product must always come first. ***Tech without a good product is nothing***. Technology is an enabler, a good product should always be the driver.

I think this video from the Steve Jobs summarizes properly the idea:

https://www.youtube.com/watch?v=oeqPrUmVz-o

> You’ve got to start with the customer experience and work backwards to the technology. You can’t start with the technology and try to figure out where you are going to try to sell it.
> 
> […]
>
> As we have tried to come up for an strategy and a vision for Apple, it started with what incredible benefits can we give to the customer. Where we can take the customer.
> – <cite>Steve Jobs</cite>

Now we are ready to do a similar analogy: is not about Wasm (even if without it I would have probably never written this article).

## Is not about Wasm, silly!

Wasm is an incredible technology. However, Wasm by itself doesn’t bring us anywhere, Wasm is an enabler (but if Wasm did not exist, other technology will probably come to play: perhaps LLVM IR, asm.js, NaCL or even RISC-V may have been the choice for this universal layer).

In any case, here are the ***first principles*** that I believe will make Wasm incredibly adopted (as a technology):

- Computation abstraction over chipset instructions or Operating System
- Runs optimally on the browser (while having lighter requirements than JS in the VM side)
- It’s secure/sandboxed by default
- Can be easily embedded in any programming language
- It can be precompiled/preprocessed to run performantly over time
- It’s execution is (mostly) deterministic (if we keep threads and floats aside for now!)

Now that we have identified the first principles that make the technology great, we are ready to understand what we can deliver with this new superpowers.

## Is about what you can do Wasm!

Wasm enables great new markets, if we analyze those based on the first principles.

In my point of view, here are the main products that will take advantage of the new capabilities that you can bring thanks to WebAssembly:

- Browser applications will become way more powerful than we have been seeing to date. Examples of this:
    - In-browser UI editors: Figma, …
    - In-browser Video editors
    - In-browser (introduce your compute-intensive app here)…
- Running untrusted 3rd party applications/code/libraries
- Serverless / Edge Computing.
    - CDNs (usually HTTP based): Cloudflare, Fastly, …
    - Fully Edge applications
- Compute pipelines
- Web3
    - Smart Contracts
    - The computing decentralization engines of the future (Dfinity is an example of this)
- Universal software stores (aka: WAPM, App Stores or more)
- Universal IR (one language to bind all languages together, more powerful than GraalVM)

As such, we shouldn’t be blinded by Wasm as a technology, but by the products that are now possible with it. Great examples of already successful products built on it are: [Google Earth](https://web.dev/earth-webassembly/), [Figma](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/), the [Disney App](https://medium.com/disney-streaming/introducing-the-disney-application-development-kit-adk-ad85ca139073), Cloudflare Workers and even the [Cloudflare 1.1.1.1 DNS](https://blog.cloudflare.com/big-pineapple-intro/), but also many more…

And, on that note, I can’t be more excited to show what we have been working on in the last year at Wasmer.

Stay tuned for more Wasmer updates… let’s always remember that a good product always wins!
