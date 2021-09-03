---
title: Compiling Wasmer to WebAssembly
excerpt: 'TBD'
date: '2021-07-22T15:35:07.322Z'
author: Ivan Enderlin
published: true
---

Wasmer is a WebAssembly runtime. It is written in Rust. It has been
embedded successfully in C, Go, Python, PHP, Ruby, Java and so on. The
community is writing many embeddings, and we are thankful for that! We
believe that our simple but powerful API, and our pluggeable design,
makes it easy to embed Wasmer in many environments.

At the end, whatever the language in which the _frontend API_ is
written (Rust, C, Go, Python, PHP, Ruby, Java and so on), it is always
the same Wasmer “core” that is used and that runs. We work hard to
make this Wasmer “core” available on as many platforms and
architectures as possible. It includes `x86_64`, `aarch64`, Linux,
macOS, Windows, FreeBSD etc. In all those situations, Wasmer runs on a
system.

But today, we are announcing a new way to execute Wasmer. What if we
want to run Wasmer, not in a system, but in a runtime like a
JavaScript environment? What would be required? Well, we would need to
make Wasmer compilable to WebAssembly. And this WebAssembly module
would need to import JavaScript API.

And that, is `wasmer-host-js`. This Rust crate provides the same API
than the `wasmer` Rust crate. With `wasmer-host-js`, there is no
concept of engines, or compilers, because the WebAssembly modules are
compiled and executed by a JavaScript engine.

The JavaScript engine can be a browser, Node.js or Deno, for the most
popular use cases.

It means that if you've written a Rust program that uses Wasmer to
execute WebAssembly, then it is now possible to compile this entire
program to WebAssembly, and to make it run in a JavaScript
environment.

# Let's play!

We are going to write a Rust program `hello` that compiles and runs a
WebAssembly program with Wasmer. This `hello` program will then be
compiled to WebAssembly, and be run in a browser with JavaScript.

```rust
use js_sys::Uint8Array;
use wasm_bindgen::prelude::*;
use wasmer_js::{imports, Instance, Module, Store, Value};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(value: &str);
}

#[wasm_bindgen]
pub fn run(buffer: &Uint8Array) {
    let module_wat = r#"
    (module
      (type $t0 (func (param i32) (result i32)))
      (func $add_one (export "add_one") (type $t0) (param $p0 i32) (result i32)
        local.get $p0
        i32.const 1
        i32.add))
    "#;

    let store = Store::default();
    let module = Module::new(&store, &module_wat).unwrap();
    let import_object = imports! {};
    let instance = Instance::new(&module, &import_object).unwrap();

    let add_one = instance.exports.get_function("add_one").unwrap();
    let result = add_one.call(&[Value::I32(41)]).unwrap();
    assert_eq!(result[0], Value::I32(42));
    log(&format!("result = `{}`", result[0].unwrap_i32()));
}
```

Let's run it with:

```shell
$ wasm-pack build --target web
```

And then, let's write our `index.html`:

```html
<html>
  <head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
  </head>
  <body>
    <script type="module">
      import init, { run } from './pkg/hello.js';

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
