---
title: "Announcing WASIX"
ogImage: 
    url: '/images/blog/wcgi-thumb.png'
excerpt: "WASIX extends the WASI proposal to build useful and productive applications today with full POSIX compatibility"
date: "2023-05-26T12:00:00.000Z"
coverImage: '/images/blog/wcgi-thumb.png'
author: Syrus Akbary
published: false
---

Today we are very excited to launch a new initiative that will start shaping the future of WebAssembly on both the browser and the server.

WASI was announced about 4 years ago and was a great push to move the Wasm community forward. It got everyone so excited that even Solomon, the founder of Docker tweeted about it: 

https://twitter.com/solomonstre/status/1111004913222324225?s=20

> Note: Solomon Hykes is also an investor in Wasmer

The ambition of WASI is a great one and we continue to support it, but it's slow iteration pace it's holding back the progress on making Wasm widely adopted.

### 🥁 Drumroll

Because of this, the Wasmer team and key community members have been working relentlessly to enhance the existing WASI ABI, *stabilizing it* and making it *more compatible with POSIX* programs.

**Today, we are incredibly excited to launch WASIX!**

WASIX is ready **today** for the community to build ***awesome*** apps and complete their runtimes: supporting threads, Berkeley *sockets*, *forking* and many more things that have been available for almost all the life of POSIX.

We want WebAssembly to be widely adopted, and we believe this step will pave the way by making it easier to compile and run any apps into Wasm.

And here’s the proof: `curl` fully running on WASIX! 🚀 

```bash
# Install Wasmer v4.0.0-alpha.1
$ curl https://get.wasmer.io -sSfL | sh -s "v4.0.0-alpha.1"
# Run curl compiled to WASIX with Wasmer!
$ wasmer run --net curl/curl -- http://neverssl.com

<html>
	<head>
		<title>NeverSSL - Connecting ... </title>
		<style>
[...]
```

> Note: you will need Wasmer `4.0.0-alpha.1` to run it.

But not only `curl`... we also got `bash`, `CPython`, `tokio`, `hyper`, `axum`, `static-web-server` and many more apps and libraries running on WASIX. Even [this very own website](https://wapm.io/wasmer/wasmer-io) runs on WASIX!

Did you got as excited reading this as we did working on it? Continue reading to learn more about WASIX and how you can use it!


## So, what exactly is WASIX?

WASIX is the long term stabilization and support of the existing WASI ABI *plus* additional non-invasive syscall extensions that complete the missing gaps sufficiently enough to enable real, practical and useful applications to be compiled and used **now**. It aims to speed up the ecosystem around WASI so that the Wasm’ification of code bases around the world can really start ***today!*** And it does so without any *breaking change* to `wasi_preview1`.

WASIX:
- It’s a **toolchain**:
    - [Rust](#rust)
    - [C](#ccpp) (upcoming support for Zig!)
    - AssemblyScript (expect upstream support soon!)
- It's a **specification**: https://wasix.org/docs/api-reference
- **Runtime** support: starting with Wasmer, but we expect more runtimes joining the initiative soon!
- Is fully runnable in **browsers**

## **What extension features will you get with WASIX?**

- full support for efficient multithreading
- full support for sockets (`socket`, `bind`, `connect`)
    - IPv4, IPv6
    - UDP, TCP
    - Multicast, Anycast
    - RAW sockets
- current directory support (`chdir`)
- `setjmp` / `longjmp` support (used extensively in `libc` ) via `asyncify` wizardy
- `pthreads` support
- process forking (`fork` and `vfork` )
- subprocess spawning and waiting (`exec` , `wait` )
- TTY support
- asynchronous polling of sockets and files
- pipe and event support (`pipe`, `event` )
- DNS resolution support (`resolve` )

### Running seamlessly in the browser or server

WASIX programs can run anywhere: in the browser or the server.

As an example, we have created `wasmer-web` , which basically showcases that any WASIX program published to Wasmer (including those with threads and forking!) works also with Wasmer running on the browser.

Too good to be true?

Try it yourself online and let us know your thoughts!

https://wasmer.sh/


![Wasmer.sh](/images/blog/wasmer-sh.png)


> Wasmer.sh runs `bash` compiled to Wasm/WASIX and pipes the stdin/stdout to xterm.js.
When you run `wasmer run syrusakbary/python` a new subprocess is created/forked.

----

# So, how can you start use WASIX?

<a id="rust"></a>

## Rust

Compiling to Wasm/WASIX from Rust is simple. You can use `tokio`, `mio` (with full sockets support), …and anything you want!

Just use the WASIX toolchain!

```bash
$ cargo install cargo-wasix
# In a directory with a Cargo.toml:
$ cargo wasix build 
```

> Note: support for some libraries is not added upstream yet, so you may need to use a patched version.

### Rust Demos

Sample Rust applications that you can compile to Wasm with WASIX:

- Static-web-server - `wasmer run wasmer/static-web-server`
  Uses tokio/mio under the hood.
  <br />Source: https://github.com/john-sharratt/static-web-server
- Tantivy
- Leptos
- Anything else… literally. Even if it uses threads or anything else.

<a id="ccpp"></a>

## C/C++

We are working in a toolchain for C that will make a breeze compile your C applications to WASIX.

Meanwhile, you can use wasix-libc to compile your C/C++ programs to WASIX.

https://github.com/wasix-org/wasix-libc


Here are some C applications that we compiled to WASIX:

- Bash - `wasmer run sharrattj/bash`
  <br />Source: https://github.com/wasix-org/bash
- Dash - `wasmer run sharrattj/dash`
  <br />Source: https://github.com/wasix-org/dash/tree/master 
- Curl - `wasmer run curl/curl`
  <br />Source: https://github.com/wasix-org/curl
- CPython - `wasmer run wasmer/python`
  <br />Source: https://github.com/wasix-org/curl

----

## In summary...

We got `curl`, `cpython`, `bash`, `tokio`, `axum`, and many more programs with minimal-to-no-modifications compiling to Wasm/WASIX.

WASIX is here to allow any developer to target WebAssembly with their already existing applications without requiring any code modification, at all...

### Please check [wasix.org](https://wasix.org/) to learn more about WASIX

Stay tuned for more updates… incredible exciting stuff is on the horizon!
