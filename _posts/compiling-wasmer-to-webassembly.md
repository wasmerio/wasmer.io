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
embeddings, and we are thankful for that! We believe that our simple
but powerful API, and our pluggeable design, makes it easy to embed
Wasmer in many environments.

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

And that, **is the same `wasmer` Rust crate but with the `js` feature
turned on**, that's it! It is the same API than with the `sys`
feature, except that there is no concept of engines, or compilers,
because the WebAssembly modules handled by Wasmer are compiled and
executed by a JavaScript engine.

The JavaScript engine can be a browser, Node.js or Deno, for the most
popular use cases.

It means that if you've written a Rust program that uses Wasmer to
execute WebAssembly, then it is now possible to compile this entire
program to WebAssembly, and to make it run in a JavaScript
environment.

# Let's play!

We are going to write a Rust program named `runner` that compiles and
runs a WebAssembly program with Wasmer. This `runner` program will
then be compiled to WebAssembly, and be run in a browser with
JavaScript.

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

# Improving WebAssembly support inside the Web ecosystem

TO BE DEFINED
DRAFT

## WASI

DRAFT

We concede it's a little bit meta. So far, no browsers support
WASI. But Wasmer has a solid WASI implementation. And since it can now
compile to WebAssembly to run a JavaScript environment, then it makes
WASI available in allo browsers. It is meta in the sense that it's a
WebAssembly engine that runs WebAssembly to implement WASI.

## Module introspection

DRAFT

Because Wasmer also supports `Module` introspection, then with
`wasmer-host-js`, you can inspect any WebAssembly module in the
browser.

# Performance

TO BE DEFINED
DRAFT

* size of the resulting WebAssembly module (the smallest program that uses WebAssembly)
* 
