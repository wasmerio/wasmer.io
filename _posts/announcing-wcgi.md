---
title: "Announcing WCGI - Revolutionizing Server Development with WebAssembly"
ogImage:
    url: ".."
excerpt: ".."
date: "2023-4-04T12:00:00.000Z"
coverImage: ".."
author: Michael Bryan
published: false
---

We are excited to introduce WCGI, the new CGI standard based on WebAssembly!

With WCGI, developers can write CGI scripts in any language that compiles to WebAssembly, such as Rust, C++, and AssemblyScript. This provides a level of flexibility that was previously unheard of in the world of CGI.

WCGI promises to be more secure than traditional CGI. As the use of WebAssembly ensures that scripts are executed in a completely sandboxed environment, preventing malicious code from wreaking havoc on servers.

Imagine using a Wordpress installation without having to worry if the attackers might get into your system. Imagine no more… WCGI is here!

[VIDEO of Wasmer running Wordpress]

## Great, but why?

When approaching Serverless, one has to realize that the CGI standard is very close to what most serverless solutions aim to provide, that is: execution of a program per http request.

Funnily enough, CGI can actually scale way better than most other solutions in serverless (`wsgi` in Python/Ruby, NodeJS, …) and is closer to the workers proposal from the [Winter Community Group](https://wintercg.org/) than other solutions.

For example, if we want PHP programs running in our servers, we have two options:

1. Wrap the PHP interpreter with our custom layer per http call
2. Use the existing PHP-CGI program, and just compile it to Wasm

The reader might understand that 2 is actually a much faster approach towards the outcome of enabling any web application on Wasmer. So we went with 2 rather than creating our own standard.

WCGI is just CGI compiled to WebAssembly, no modifications required.

## How you can use it

If you are in rust, you can use the `cgi` crate:

```toml

```

First, annotate your `wasmer.toml` file:

```toml
here is the wcgi runner
```

You can find an example of this package living here: github.com/…

Now, try to run it!

```toml
wasmer run myuser/mywcgiprogram
```

## Wordpress

There was previous work compiling PHP to Wasm and we took on the shoulders of giants to enable this awesome use case to our users:

```toml
wasmer run myweb/wordpress
```

We can't wait to see what developers create with WCGI.

Stay tuned for more updates on this exciting new technology!
