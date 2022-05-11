# WebAssembly Core 2 - Reporting From the Town Square

**Background**

WebAssembly (Wasm) is a bytecode for the Web. Developers can choose between Javascript or any language that compiles to Wasm for browser apps. Once low-level languages like Rust and C/C++ compile to Wasm, the resulting bytecode executes universally on most modern browsers.

Similar to Javascript and Node, Wasm apps can also support universal execution on servers with a server-side runtime like Wasmer. Now that you're caught up, you should stop what you're doing and immediately start learning and using WebAssembly.

Or, keep reading...

**State of WebAssembly**

It's been a 7-year long journey to the WebAssembly 2022 draft proposal. Initially announced in 2015, the world first experienced WebAssembly in the wild two years later, in March of 2017. As the news of the new spec makes its rounds on the Internet, many developers sing its praises while others meticulously document its shortcomings and wishlist items on public forums. This article highlights, expands, and adds perspective to some interesting reoccurring themes. However, before we dive too deep into the minds of the developer community, and for the benefit of the uninitiated, you can read the summary of all things new in the WebAssembly Core 2 draft spec [here](https://www.w3.org/TR/wasm-core-2).

<aside>
💡 **The list of new features includes** Exception Handling, SharedArrayBuffer, Fixed-Width SIMD, Tail Calls, Multiple Memories, and WASI improvement.

</aside>

**Wasm discourse**

WebAssembly and associated toolchain components are very technical, and the discourse surrounding the new spec is not an exception. I've combed through Hacker News, Reddit, Twitter, and other community sites and segmented my observations below.

**Back to the future with the JVM**

The Java Virtual Machine (JVM) is infamously known for the slogan write once, run everywhere. A common critique for WebAssembly and specifically WebAssembly runtimes is that they are similar to the JVM.

Aren't we just reinventing the wheel?

True, Java code can be written once and executed everywhere. The modern JVM supports multiple languages. Java and the JVM have served the developer community and enterprises well. However, it is not the solution that takes us forward and into the future.

Let's dig a bit deeper.

The main difference between WebAssembly Runtimes and the JVM is the close relationship between JVM-supported languages and the Java object model. The JVM has a strong opinion about how applications are developed and shaped, whereas Wasm isn't tied to any specific language. There are multiple options for writing code in your favorite programming language and compiling it to Wasm, including popular choices for the JVM.

The JVM simplifies desktop application development and distribution. However, the JVM never found a native home in browsers. Early in the dot-com era, many tools enabled Java in browser environments. Some are more successful than others. Perhaps the "Web" in WebAssembly is its most significant advantage. Today, four important browsers already have nearly identical native support for Wasm, and there are several server-side runtime options like Wasmer for running Wasm code outside the browser. Additionally, the language interoperability enabled through Wasm isn't an option with the JVM.

If we use the wheel metaphor, I'd ask you to think about using a stone or wooden wheel instead of the modern tires we use on our streets and freeways. WebAssembly is the next evolution of legacy technologies like the JVM and the CLR to answer the question directly.

**Fancy colors and buttons**

UIs in WebAssembly is a complicated topic. It is impossible to read about WebAssembly and not find DOM access or UI framework support as heated discussion points. I've witnessed complete operating systems GUIs and CAD programs compiled to WebAssembly running in browser environments.

What are the options?

Luckily, there are many solutions available or in the works. Companies like Uno Platform have built a Microsoft Blazor-enabled solution that leverages WebAssembly to deliver pixel-perfect cross-platform UIs. If Microsoft and Blazor are not your thing, use Yew, a Rust-based solution to create UIs with WebAssembly. Finally, if all else fails, you can always write your own ABI just the way you like it.

It seems like a solved problem, so what's the issue?

It's an ABI issue. ABIs or Application Binary Interfaces are the mechanisms that expose system-level capabilities that make executing your Wasm apps possible. There are many ABIs, but WASI (WebAssembly System Interface) and Emscripten are the two most widely used for Wasm apps. WASI is designed for secure, sandboxed code execution and provides limited functionality that does not include GUI support. Yet. Emscripten delivers a broader range of functionality but requires browser execution to provide sandboxing and security guarantees.

There are many solutions to the ABI issue as well. For instance, the community will eventually introduce additional features to WASI. That's the "wait and see" approach. Another option might be a custom ABI, a competing or complementary standard to WASI that includes additional features with better ergonomics.

We've highlighted a "wait-and-see" and a "do-it-yourself" approach. One approach potentially eliminates Wasm as a choice due to a lack in maturity, while the other introduces additional overhead. WebAssembly is deep technology with a community to match, so there should be many DIY projects to fill the gaps.

Are there lots of DIY projects?

Yes and no. A lot of projects exist to fill in the gaps. For example, [wit-bindgen](https://github.com/bytecodealliance/wit-bindgen) is an experimental temporary solution for interface types. However, the ecosystem must catch up compared to older technologies like Docker, Kubernetes, and Javascript/Node.

What's the hold-up?

WebAssembly is important, and many companies and groups of people are trying to curate a standard that works and scales. Sometimes consortiums set up a perception that experimentation and project incubation outside official channels might be a waste of time and money with limited returns, so smart people and companies avoid creating waves in the ecosystem.

**The temple of your favorite programming language**

We've now entered a religious territory. There is a lot of time spent on the Internet flexing programming skills, and mastery of Javascript, python or whatever language of choice is so great nothing else makes sense. One thing I've learned about other people's religions, don't mess with them. However, there is something to be said about learning something from different thriving ecosystems.

The previous section refers to a fear of creating waves in an ecosystem where the standard is still forming. Perhaps the real worry is the fear of your project being rejected or worse, that your code gets refactored by someone else. Other communities and ecosystems do not have that fear. Javascript, for example, is the epitome of a tale of two cities. It is at the same time the most loved and hated programing language of all time, with a profoundly religious following. There is something to be learned from Javascript and its ecosystem.

What makes the Javascript ecosystem so powerful?

The answer here is easy.

- Javascript is accessible with many online resources for new and expert developers. Its low barrier to entry and utility made it a natural monopoly.
- Many centralized repositories with a critical mass of projects and users reinforce the ecosystem. (E.g., NPM)
- The Javascript community does not have a fear of rejection or cannibalization. (E.g., Angular, React, Vue, Next.js, Nuxt.js, Svelt, too many to list)

The proliferation of competitive solutions ensures the survival and evolution of the ecosystem and a cult-like following that welcomes healthy decent.

So what can we learn?

The answer here is also easy, but the execution is tricky.

- Wasm must become more accessible. The community requires better tooling, documentation, and examples.
- Wasm must have mature tooling and a process for curating and discovering solutions. Wasmer has created [WAPM](https://wapm.io/), our WebAssembly Package Manager. It's a tool for Wasm apps, packages, and the people who build and use them.
- There is no efficient market for ideas. We must all work together to lower the barriers to create solutions to problems without fear of cannibalization.

WebAssembly is important, and we want to make it a universal standard, which requires a proliferation of competitive solutions and ideas.

**Getting started with WebAssembly**

The next segment of my journey into the rabbit hole of the Internet comment section is about getting started. However, before we answer how to get started, let's review the companies and products built with WebAssembly.

- **Figma:** That's right. The Internet's favorite online design tool heavily relies on WebAssembly in the browser to deliver a smooth user experience with little to no latency.
- **Shopify:** Plugins for the e-commerce platform are written in Assemblyscript and compiled to WebAssembly for sandboxed execution.
- **Brave:** Yes, the most popular browsers ship with full Wasm support. However, Brave also happens to use Wasmer and WebAssembly to process images.
- **Amazon Prime:** Amazon Primes OTT (Over The Top) software for streaming devices heavily relies on WebAssembly. I bet you didn't see that coming.
- **Cosmos:** An ecosystem for Blockchain and DeFi companies that leverage Wasm to process smart contracts.
- **Hot.ai:** A TinlyML company leverages Wasm and Wasmer to ship machine-learning code to connect and semi-connected infrastructure.
- ...

And the list goes on. The type of companies that build on WebAssembly ranges from trillion-dollar global enterprises to small-scale startups. The use cases for Wasm and how you can use it are almost limitless.

As you can see, there are lots of companies that are adopting WebAssembly to solve real problems. I mention these companies before discussing how to get started because there is a misconception that you have to work for Apple, Google, Amazon, or be a member company of the Bytecode Alliance to work with WebAssembly. That's not true. The most challenging part of getting started with WebAssembly is picking where to start. Let's not forget that Wasm and most toolchains working with and supporting Wasm are open-source.

Here is what worked for me as a non-developer.

- I decided that I wanted to be a part of the WebAssembly world.
- I aligned my skills to the contribution I wanted to make.
- I found a project that welcomed me... after a lot of persuading.

Many of you are developers with excellent technical skills and don't need to persuade anyone. You can start just by creating a project.

**Slow Development Cycles**

Finally, is the development cycle for WebAssembly slow, or is the slow pace a perception fueled by our desire for instant gratification?

I'm reminded of an old Ketchup commercial from my childhood in contemplating this question. Heinz, the company behind the commercial, created glass bottles not conducive to the flow of Ketchup and spent millions of dollars on an ad campaign to convince people that good things come to those who wait. You can check out the old video on [youtube.](https://youtu.be/N_vssdys8lk) Years later, the plastic squeeze bottle finally answered the question. Yes, the Ketchup coming out of a glass bottle is not fast enough. The novelty of good advertising eventually wears off, and good old-fashioned innovation prevails.

Wasm and the tools that support it are complex. The pace of development for WebAssembly may be just right. Based on its maturity and development lifecycle, the best we can do for now is to take the glass bottle approach. However, in my opinion, WebAssembly doesn't need to be "Too Slow and Too Steady."

The previous section is about who is using WebAssembly today and how community members can get started. Clearly, the use cases for Wasm are broad and deep. At Wasmer, we believe WebAssembly is a transformational technology and can use a squeeze bottle approach to speed up innovation. Yes, injecting more ideas and resources into something early in the process might cause chaos. Still, I am excited about the possibilities and benefits realized from a bit of speed and chaos, and I invite you to join the party.

You can join the conversation on the Wasmer Community channel. [Click here to join.](https://join.slack.com/t/wasmerians/shared_invite/zt-d977b9f8-82yuv7JjOxy1RppGsstf8Q)

# About Wasmer

Headquartered in San Francisco, CA, Wasmer Inc. is behind the popular open-source WebAssembly runtime Wasmer. In addition to the Wasmer runtime, the company has made significant investments in [WAPM](https://wapm.io/), the WebAssembly Package Manager, and many other open-source projects in the WebAssembly ecosystem.

**Our mission is to make software universally available**. We are committed to the open-source community and strive to contribute to developers and companies worldwide to help make Wasmer and WebAssembly a universal standard.