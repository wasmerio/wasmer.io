---
title: Compiling Wasmer to WebAssembly
excerpt: 'TBD'
date: '2021-07-22T15:35:07.322Z'
author: Ivan Enderlin
published: true
---

Wasmer is a WebAssembly runtime. It is written in Rust. It has been
embedded successfully in C, Go, Python, PHP, Ruby, Java and so on;
there is a very long list now! The community is writing many
embeddings, and we are thankful for that! We believe that our powerful
API, and our pluggeable design, makes it easy to embed Wasmer in many
environments.

At the end, whatever the language in which the _frontend API_ is
written (Rust, C, Go, Python, PHP, Ruby, Java and so on), it is always
the same Wasmer “core” that is used and that runs. We work hard to
make this Wasmer “core” available on as many platforms and
architectures as possible. It includes `x86_64`, `aarch64`, Linux,
macOS, iOS, Windows, FreeBSD etc. In all those situations, Wasmer runs
on a system.

But today, we are announcing a new way to execute Wasmer. What if we
want to run Wasmer, not in a system, but in a runtime like a
JavaScript environment? What would be required? Well, we would need to
make Wasmer compilable to WebAssembly. And this WebAssembly module
would need to import JavaScript API.

And that, **is the same `wasmer` Rust crate but with the `js-default`
feature turned on**, that's it! It is the same API than with the
`sys-default` feature you already know and love. The main difference
is that there is no concept of engines, or compilers, because the
WebAssembly modules handled by Wasmer are compiled and executed by the
host, i.e. the JavaScript engine that executes Wasmer. But there is
big pros of using this approach, let's see them in details!

The JavaScript engine can be a browser, Node.js or Deno, for the most
popular use cases.

It means that if you've written a Rust program that uses Wasmer to
execute WebAssembly, then it is now possible to compile this entire
program to WebAssembly, and to make it run in a JavaScript
environment.

# Let's run WASI in a Web browser? Yeah!

We are going to write a Rust program named `runner` that compiles and
runs a WebAssembly program with Wasmer. This `runner` program will
then be compiled to WebAssembly, and be run in a browser with
JavaScript. We are going to use
[`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) to generate
the glue between Rust and JavaScript, and
[`wasm-pack`](https://github.com/rustwasm/wasm-pack/) to package
everything in one command line.

```rust
use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;
use wasmer::{Instance, Module, Store};
use wasmer_wasi::{Pipe, WasiState};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(value: &str);
}

#[wasm_bindgen]
pub fn run(wasm_bytes: Uint8Array) {
    // Create the store.
    let store = Store::default();

    // Compile the WebAssembly module received as bytes.
    let module = Module::new(&store, wasm_bytes.to_vec()).unwrap();

    // Setup WASI.
    let mut wasi_env = WasiState::new("hello")
        .stdout(Box::new(Pipe::new()))
        .finalize()
        .unwrap();

    // Get an import object that is pre-configured for WASI.
    let import_object = wasi_env.import_object(&module).unwrap();

    // Let's instantiate the Wasm module!
    let instance = Instance::new(&module, &import_object).unwrap();

    // Start the WASI module by calling its `_start` function (aka
    // `main`).
    let start = instance.exports.get_function("_start").unwrap();
    start.call(&[]).unwrap();

    // Fetch the content of the WASI stdout buffer.
    let mut state = wasi_env.state();
    let wasi_stdout = state.fs.stdout_mut().unwrap().as_mut().unwrap();

    let mut stdout_content = String::new();
    wasi_stdout.read_to_string(&mut stdout_content).unwrap();

    log("== WASI stdout:");
    log(&stdout_content);

    // Yeah!
    log("\n\n== Over.");
}
```

It's the same code that you would have written in a regular Rust
program! There is absolutely zero difference.

Let's compile this Rust program to WebAssembly with:

```shell
$ wasm-pack build --target web
```

Now, we are going to write an HTML file with some JavaScript to:

1. Load this `runner` Rust program above as a WebAssembly module,

2. Provide a file picker to the user to upload any WebAssembly + WASI
   module,

3. As soon as this WebAssembly module is uploaded, we pass it (as a
   `Uint8Array`) to the `run` function of `runner`.

```html
<html>
  <head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
  </head>
  <body>
    <script type="module">
      import init, { run } from './pkg/runner.js';

      async function test() {
          await init();

          document.getElementById('wasm_picker').addEventListener(
              'change',
              run_wasm,
              false
          );
      }

      async function run_wasm() {
          const wasm_files = this.files;

          if (wasm_files.length < 1) {
              return;
          }

          const wasm_file = wasm_files[0];
          const reader = new FileReader();
          reader.readAsArrayBuffer(wasm_file);
          reader.onload = function (e) {
              run(new Uint8Array(e.target.result));
          };
      }

      test();
    </script>

    <label for="wasm_picker">Pick a WebAssembly module:</label>
    <input id="wasm_picker" type="file" accept="application/wasm" />
  </body>
</html>
```

OK! Now let's try with a real program. Let's avoid using Rust for a
moment, just to get more fun. Let's use Go for instance! (We are using
[TinyGo](https://tinygo.org/) as it produces WASI files agnostic of
the host).

```c
// `hello.go`
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

And let's compile it to a WebAssembly + WASI module:

```shell
$ tinygo build -target wasi -o hello.wasm hello.go
```

At this step, we end up with a `hello.wasm` module. Let's use the file
picker in our HTML page, and see what's happening in the Web Console!

```
== WASI stdout:
Hello, World!


== Over.
```

🎉

Do you realise what it means? Any browser with no WASI support can run
a WebAssembly WASI module thanks to Wasmer.


# Improving WebAssembly support inside the Web ecosystem, with WebAssembly

With this new ability for Wasmer to be compiled to WebAssembly and to
use the API brought by the JavaScript host, it is possible to enhance
and to improve the current WebAssembly support inside the entire Web
ecosystem. We concede it's really meta: Improving WebAssembly with
WebAssembly, but there is few tricks that make it possible. Let's go
through the most important ones.

## In-Memory File System

One of the most important piece to run WASI is to have a **file
system** nearby. We have written a new Rust crate: `wasmer_vfs`, which
stands for Virtual File System. It provides a set of traits that are
necessary to use a file system. This Rust crate also provides 2 file
system implementations:

* `host_fs` is an API that uses the current host file system if it
  exists. It uses [the standard `std::fs` Rust
  API](https://doc.rust-lang.org/std/fs/),
  
* `mem_fs` is an API that exposes a file system that lives entirely in
  memory. We have written this file system from scratch.
  
Thus `wasmer_wasi` now has a “file system backing” which uses the
traits from `wasmer_vfs`. It is even possible to mix multiple file
systems in the same execution.

We would like to highlight `mem_fs` 💡. It allows to run a WebAssembly
module even if the host has no file system, or if accessing the host
file system would have too much impacts on the performance!

When running WebAssembly on the cloud or on the edge, at some point
comes the choice of whether you want to provide stateful or stateless
environment for the application.

* In a stateful context, the host has to guarantee strict sandboxing,
  either by mounting and unmounting a specific file system point
  before and after each execution of the application. It adds a
  non-negligeable complexity, and it obviously impacts performances.

* In a stateless context, the WebAssembly module might still need to
  access some files (some assets, like images for example, or some
  configuration files). In that case, the host needs to provide thoses
  to the application, and there is no standard way to do that, except
  by using a file system!

In those scenarios, `mem_fs` can help quite a lot:

1. It provides the sandboxing level that the host must guarantee,
2. It's faster to setup and to destroy than a real hosted file system,
3. It's fast to read and to write (we have meticulously written
   algorithms so that readings, writings and renamings are all
   optimised).
   
That's one use case where `mem_fs` shows itself to be pretty useful.

## WASI, one implementation to rule them all

As we said multiple times already, Wasmer with the `wasmer` and the
`wasmer_wasi` Rust crates compiled to WebAssembly with their
respective `js-default` feature flag, can now provide WASI support to
any JavaScript host, including browsers.

Wasmer already pushed the limit of WASI to the Web with [the
JavaScript `@wasmer/wasi`
package](https://www.npmjs.com/package/@wasmer/wasi). Our end goal is
to be able to replace all the code in `@wasmer/wasi` except the public
API and to run Wasmer behind the scene. That's a work we have already
started. That way, we won't have two implementations to maintain but a
single-one!

On the `wasmer_wasi` Rust side, we have —since the beginning— a large
test suite to test WASI, WAST, our implementation against the official
specification test suite etc. The quality on that side is high, as for
any libraries we write. With `wasmer_vfs`, we can run the same tests
alternatively with `host_fs` and `mem_fs` to ensure our implementation
acts the same whatever the file system is used. It also ensures that
`mem_fs`, which is used in the context of a JavaScript host, will
provide the same behavior as if the WebAssembly module was running in
a Linux, or macOS, or iOS, or Windows and so on.

## Module Introspection

Another feature that the standard Web API is lacking to provide is
WebAssembly Module Introspection. Hopefully, it's now possible with
Wasmer! Indeed, the `Module` type provides the `imports` and `exports`
methods. One can query a WebAssembly module directly through Wasmer
compiled to WebAssembly!

# Performance

Let's see what is the overhead of using Wasmer as a WebAssembly in a
JavaScript host. First, let's see the size of our “runner” WebAssembly
module:

* Without WASI support: about 200Kb uncompressed, and 55Kb compressed,
* With WASI support: about 700Kb, and 150Kb compressed,

Compression is performed with
[Brotli](https://github.com/google/brotli).

The runtime performance are similar to what the JavaScript host
provide. If it's Mozilla Firefox, Google Chrome, Apple Safari,
Node.js, or Deno, they all provide a WebAssembly runtime, which is
used by Wasmer in this context.

We reckon the overhead is quite small considering what it allows to
accomplish.

# Conclusion

TO BE WRITTEN

