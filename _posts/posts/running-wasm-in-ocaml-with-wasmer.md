---
title: 'Running WebAssembly in OCaml with Wasmer'
description: 'Running WebAssembly in OCaml with Wasmer'
publishedAt: '2022-10-21T18:00:00.000Z'
author:
  name: 'Loïc Chevalier'
status: 'published'
---

**TL;DR**

- [https://github.com/wasmerio/wasmer-ocaml](https://github.com/wasmerio/wasmer-ocaml)
- [https://docs.wasmer.io/integrations/ocaml](https://docs.wasmer.io/integrations/ocaml)

OCaml is a strongly-typed language that is very popular for FinTech, research and academic education. It is also an object-oriented language, as well as a functional language. It is like Python in that it has a REPL, so quick tests are very easy to do, but it can also be compiled to native executables as well.

For those main reasons, I wanted to create Wasmer bindings in OCaml, to be able to load any function from any language compiled to WebAssembly, and use them in OCaml.

(Existing prior art is [github.com/sgrove/wasmer-ocaml](https://github.com/sgrove/wasmer-ocaml) but unfortunately, it was only a work in progress and hasn’t been updated for 2 years.)

So, how you can use WebAssembly in OCaml? First, let’s install Wasmer with OPAM.

```bash
$ opam install wasmer
```

Now, you should be able to run the following program.

```ocaml
open Ctypes;;
open Wasmer;;
open Wasmer.Util;;

let () =
  print_endline "Generating the wasm module...";
  let wasm = wasm_of_wat
  {|(module
      (type $add_one_t (func (param i32) (result i32)))
      (func $add_one_f (type $add_one_t) (param $value i32) (result i32)
        local.get $value
        i32.const 1
        i32.add)
      (export "add_one" (func $add_one_f)))|} in

  print_endline "Creating the store...";
  let engine = Engine.new_ () in
  let store = Store.new_ engine in

  print_endline "Compiling the module...";
  let module_ = Module.new_ store wasm in

  print_endline "Creating imports...";
  let imports = Extern.Vec.make_empty_null () in

  print_endline "Instanciating the module...";
  match Instance.new_ store module_ imports with
  | Error _ -> print_endline "> Error instanciating the module!"; failwith "Invalid module!"
  | Ok instance ->
  print_endline "Retrieving exports...";
  let exports = Extern.Vec.make_new () in
  Instance.exports instance exports;

  let add_one_f = Extern.to_func (Extern.Vec.get_element exports 0) in
  if Func.is_null add_one_f then
    (print_endline "> Error instanciating the module!"; failwith "Invalid module!");

  print_endline "Calling the `add_one` function...";
  let arg = Val.of_i32 1l in
  let args = Val.Vec.of_list [arg] in
  let results = Val.Vec.make_uninit 1 in

  match Func.call add_one_f args results with
  | Some _ -> print_endline "> Error calling the function!"; failwith "Invalid function!"
  | None ->
  print_endline ("Result of `add_one`: " ^
    (Int32.to_string (Val.get_i32 (Val.Vec.get_element_unsafe results 0))));;
```

# The API

The API underwent some changes.

The starting point is that OCaml has a package that allows to bind transparently to C functions (the `Cstubs` package). So of course, the first iteration was a straightforward one-to-one copy of the C API, which already existed.

But this method led to quite ugly and redundant code: at every Wasmer call, check if the return pointer is null… If so, there was an error, manage it… Otherwise, continue on… etc.

There is also a more subtle issue: ownership. In the C API, this is a bit visible with some C preprocessor annotations. since C has a preprocessor. The C API header contains a macro called `own`, that tells the C developer “hey, this parameter takes ownership, don’t use it afterwards!”

But this is impossible in OCaml, which lacks the concept of resource ownership.

So the new API deals with both issues, by wrapping (nearly) all raw C pointers with an ownership-maintaining structure. When calling a function, the API checks if the pointers are owned by the caller, calls the function, wraps the return value, and updates the ownership of the caller’s pointers as needed.

Also, a good thing about having a garbage collector is that I could also register a `finalizer` that deletes the pointed-to objects when they have no more reference to them if the code still have the ownership: no need to manually delete any object!

# Challenges

Of course, not everything was as smooth sailing as what I just described. There were multiple problems.

The first one is that the program crashed on exit. Using a debugger I tracked down the issue to a `free` in the source code of OCaml.

OCaml sets up an alternate stack for signal handling (which is usual for programs which do stack overflow handling) of 8KiB using a `malloc`, which is the minimal alternate stack size. But Wasmer, being a Rust library, requires a bit more and re-allocates 64KiB using an `mmap`, after OCaml set up its own.

Up until there, everything is fine.

But, when exiting, OCaml is first: it tries to call `free` on the base address of the alternate stack, which is Wasmer’s: deallocating something from `mmap` requiring a call to `munmap` instead, so the program predictably crashes.

[I created a bug report on OCaml’s side](https://github.com/ocaml/ocaml/issues/11489), and [they responded pretty quickly with a fix merged to the 4.14 branch in about a week](https://github.com/ocaml/ocaml/pull/11496).

The second issue I had was structuring interfaces and module types. Apparently, you cannot remove definitions from module types between the interface and the implementation. So I also had to fight against the type checker to be able to hide most of the non-public functions (like the one that changes the ownership however we want).

But in the end, I managed to fix those issues, and to get a pretty clean-looking API, in my opinion.

# Summary

So what does this all mean?

This means that it is now possible to use Wasmer to execute WebAssembly programs in OCaml. Furthermore, since Wasmer’s objective is also to be able to run WebAssembly in every other programming language… Well, it is now possible to use programs that can compile to a `wasm` target, inside OCaml!

So, to run this Rust program:

```rust
extern "C" {
    fn print_str(ptr: *const u8, len: usize);
}

#[no_mangle]
pub extern "C" fn hello() {
    let msg = "Hello, world!\n";
    unsafe { print_str(msg.as_ptr(), msg.len()); }
}
```

We compile it to Wasm module (using `cargo build --target=wasm32-unknown-unknown`†), and we can use it in OCaml:

<aside>
💡 † This requires the `wasm32` toolchain installed with `rustup`, otherwise compilation will fail! Issue `rustup target add wasm32-unknown-unknown` beforehand.

</aside>

```ocaml
open Ctypes;;
open Wasmer;;
open Wasmer.Util;;

let memory_ref = ref None;;
let print_str store args ret =
	match !memory_ref with
	| None ->
		Some (Trap.new_ store (Message.of_string "Called print_str with no memory!"))
	| Some memory ->
		let offset = Val.get_i32 (Val.Vec.get_element_const args 0) in
		let len = Val.get_i32 (Val.Vec.get_element_const args 1) in
		let b = Memory.get_data memory (Int32.to_int offset) (Int32.to_int len) in
		print_string (Bytes.to_string b); flush stdout;
		None;;

let () =
	let wasm = load_wasm_file
		"rust-wasm/target/wasm32-unknown-unknown/release/rust_integration.wasm" in
	let engine = Engine.new_ () in
	let store = Store.new_ engine in

	let real_module = Module.new_ store wasm in

	let print_str_functype = Valkind.[I32; I32] %-> Valkind.[] in
	let print_str_func = Func.new_ store print_str_functype print_str in

	let imports = Extern.Vec.of_list [Extern.of_func print_str_func] in
	match Instance.new_unsafe store real_module imports with
	| Error _ -> print_endline "> Error instanciating module!"; failwith "Invalid module!"
	| Ok instance ->

	let exports_raw = Extern.Vec.make_new () in
	Instance.exports instance exports_raw;

	let exported_funcs, (*exported_globals*)_, (*exported_tables*)_, exported_memories =
		Extern.Vec.split_kind exports_raw in
	let run_func, memory0 = match exported_funcs, exported_memories with
		| [f], [m] -> f, m
		| _ -> print_endline "> Error accessing exports (no function)!";
				 failwith "Invalid instance!" in
	memory_ref := Some memory0;

	let args = Val.Vec.make_empty_null () in
	let results = Val.Vec.make_empty_null () in

	match Func.call run_func args results with
	| Some trap ->
		print_endline "> Error calling the function!";
		let msg = Message.make_new () in
		Trap.message trap msg;
		print_endline (Message.to_string msg);
		failwith "Invalid function!"
	| None ->

	print_endline "Done.";;
```

---

You can find the official code here, along with some examples in the official repo:

[https://github.com/wasmerio/wasmer-ocaml](https://github.com/wasmerio/wasmer-ocaml)

Feel free to also check the documentation and see how you can start using WebAssembly and Wasmer in OCaml:

[https://docs.wasmer.io/integrations/ocaml](https://docs.wasmer.io/integrations/ocaml)
