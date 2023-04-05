---
title: "Announcing WCGI - Revolutionizing Server Development with WebAssembly"
ogImage:
    url: "TODO"
excerpt: "TODO"
date: "2023-04-04T12:00:00.000Z"
coverImage: "TODO"
author: Michael Bryan
published: false
---

Welcome to the future of server-side development with WebAssembly! Introducing
WCGI, a groundbreaking technology that marries the power of WebAssembly with the
versatility and simplicity of CGI, paving the way for a new era in serverless
applications.

WCGI is built on a straightforward idea: take an existing CGI program and
compile it to WebAssembly. The real innovation, however, lies in how `wasmer`
runs that WebAssembly.

Here are some of WCGI's highlights:

- Benefit from decades of CGI application and library development, use any language
  compilable to WASI (AssemblyScript, C, C++, Go, PHP, Python, ...)
- Reduced package size: packages will only contain your business logic
  and static assets, eliminating the need for an HTTP stack or bulky Docker
  containers
- Completely sandboxed execution: WebAssembly code runs in a sandbox, with one
  isolated instance per request


Picture a Wordpress installation without worrying about attackers breaking into
your system.

With WCGI, it's a reality.

(video of Wasmer running WordPress)

## The Why Behind WCGI

When venturing into serverless solutions at Wasmer, we faced a crucial question:
should we create our own framework and risk locking developers into a walled
garden, or should we adopt an open standard that allows them to utilize existing
code?

CGI's alignment with the goal of executing a program per HTTP request makes it a
compelling choice. Interestingly, CGI can outperform many other serverless
solutions (such as WSGI in Python/Ruby or NodeJS) in terms of scalability and
latency.

Furthermore, it also closely mirrors the workers proposal from the **[Winter
Community
Group](https://wintercg.org/)**.

Consider the challenge of running PHP programs on servers. We have two primary
options:

1. Wrap the PHP interpreter with a custom layer that instruments each HTTP call.
2. Use the existing `php-cgi` program and simply compile it to Wasm.

Option 2 is not only faster, but it also enables any web application on Wasmer
more efficiently.

By embracing WCGI, those seeking to achieve greater efficiency, security, and flexibility in server-side development can truly benefit from this innovative approach.

## Creating a WCGI Application with Rust

To create a WCGI application using Rust, first add the **`cgi`** crate as a
dependency in your **`Cargo.toml`** file:

```bash
$ cargo add cgi
```

Next, write your Rust server, like the example below:

```rust
// src/lib.rs

use cgi::{http::StatusCode, Request, Response};

fn main() {
    cgi::handle(handler);
}

fn handler(request: Request) -> Response {
    let who = String::from_utf8_lossy(request.body());
    let who = if who.trim().is_empty() {
        "World"
    } else {
        who.trim()
    };

    cgi::text_response(StatusCode::OK, format!("Hello, {who}!"))
}
```

After writing your implementation, compile it to the **`wasm32-wasi`** target.
You may need to install the WASI target if you haven’t already (`rustup target
add wasm32-wasi`).

```rust
$ cargo build --target wasm32-wasi --release
```

Create a **`wasmer.toml`** file that describes your package and contains a WCGI
command that the `wasmer` CLI will execute.

```toml
[package]
name = "wasmer/wcgi-rust-template"
version = "0.1.0"
description = "A template for WCGI applications"
license = "MIT OR Apache-2.0"
readme = "README.md"
repository = "https://github.com/wasmerio/wcgi-rust-template"

[[module]]
name = "server"
source = "target/wasm32-wasi/release/wcgi-rust-template.wasm"
abi = "wasi"

[[command]]
name = "server"
runner = "wcgi"
module = "wcgi"
annotations = { wcgi = { dialect = "rfc-3875" } }
```

Now you can start the server and browse to
[http://localhost:8000/](http://localhost:8000/) to see it in action:

```bash
$ wasmer run-unstable .
```

## Creating a WCGI Application in PHP

Using a version of `php-cgi` compiled to WebAssembly, Wasmer can now run PHP
websites using WCGI.

First, create a new repository and copy
[php-cgi.wasm](https://github.com/wasmerio/wcgi-php-template/raw/main/php-cgi.wasm)
into it. Then, create an `app/` directory and add some PHP code to it.

```bash
$ mkdir app
$ echo '<? print("Hello, World!"); ?>' > app/index.php
```

Now we need to create a `wasmer.toml` file.

This is a bit longer than the Rust one because we need to set some environment
variables that tell `php-cgi` which script to invoke. We also want the `app/`
folder to be bundled with the package when we publish it.

```bash
[package]
name = "wasmer/wcgi-php-template"
version = "0.1.0"
description = "A PHP template for WCGI applications"
license = "MIT OR Apache-2.0"
readme = "README.md"
repository = "https://github.com/wasmerio/wcgi-php-template"

[[module]]
name = "php"
source = "php-cgi.wasm"
abi = "wasi"

[[command]]
name = "php"
runner = "wcgi"
module = "php"

[command.annotations.wcgi]
dialect = "rfc-3875"

[command.annotations.wasi]
atom = "php"
env = ["DOCUMENT_ROOT=/app", "SCRIPT_FILENAME=/app/index.php"]

[fs]
"app" = "app"
```

You can now run this with `wasmer run-unstable`:

```bash
$ wasmer run-unstable .
```

Opening up our web browser shows the “Hello, World” message as expected.

![2023-03-31_14-00.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8d382cbe-fe56-435b-95af-c645cb02f026/2023-03-31_14-00.png)

You can also use the `wasmer` CLI’s `--mapdir` flag to make specific directories
on your host machine available to the WebAssembly application.

This is really useful during development because it means you can mount your
`app/` directory and make changes on the fly without needing to restart the WCGI
server.

First, start the WCGI server and tell it that the `/app` directory inside the
WebAssembly application corresponds to the `./app` directory on your host.

```bash
$ wasmer run-unstable --mapdir /app:./app .
```

If you open [http://localhost:8000/](http://localhost:8000/) up in your browser,
you should see the “Hello, World!” from before.

Next, modify `app/index.php` to print `phpinfo()` , hit save, and refresh your
browser.

![2023-03-31_13-59.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e27f4b91-ca8e-40b1-a372-dfaef9654d24/2023-03-31_13-59.png)

This package is also available [on WAPM](https://wapm.dev/wasmer/wcgi-php-template).

```bash
$ wasmer run-unstable wasmer/wcgi-php-template
```

We can't wait to see what you create next with WCGI!

## In Summary…

WCGI represents a refined approach to server-side development, integrating the
flexibility, security, and performance of WebAssembly. This innovative
technology has the potential to reshape the landscape of serverless
applications, providing developers with a powerful and versatile solution for
their projects.

Watch this space 😉
