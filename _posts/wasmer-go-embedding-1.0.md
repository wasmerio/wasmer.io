---
title: 'Wasmer Go embedding 1.0 liftoff'
excerpt: 'Announcing the immediate availability of the Wasmer Go embedding 1.0 version!'
date: '2021-02-22T15:35:07.322Z'
author: Ivan Enderlin
---

We are delighted to announce the availability of the [Wasmer Go
embedding 1.0 version](https://github.com/wasmerio/wasmer-go).

A little more than 1.5 years, we first release `wasmer-go`, the Wasmer
embedding for Go. The reception by the community was beyond our
expectations. Back then, it was [the fastest WebAssembly runtime for
Go](https://medium.com/wasmer/announcing-the-fastest-webassembly-runtime-for-go-wasmer-19832d77c050).
A community of more than 1'300 people gives us the energy to push this
project further. We have seen users from various domains that weren't
anticipated. After hundreds of thousands of installations, it's our
great pleasure to introduce the 1.0 version, fully rewritten to
provide a stable and complete API, better performance,
cross-compilation, two compilers, two engines, and many more advanced
features!

## Improved and simplified API

We have entirely rewritten the project with a new, improved API. All
the WebAssembly externals are now supported, which includes
`Function`, `Global`, `Memory`, and `Table`. All of them can be used
as imports or as exports. Well, this is now straighforward.

The `ImportObject` API is now unified and simplified (previously, we
had 2 distincts API for historical reasons).

An example is worth a thousand words. Let's consider the following
example that already illustrates many improvements:

```go
import "github.com/wasmerio/wasmer-go/wasmer"

// Create an engine. It's responsible to drive the compilation and the
// execution of a WebAssembly module.
engine := wasmer.NewEngine()

// Create a store, that holds the engine.
store := wasmer.NewStore(engine)

// Create a new module from the text representation of a WebAssembly
// (for the sake of simplicity of the example).
module, _ := wasmer.NewModule(
	store,
	[]byte(`
		(module
		  ;; We import a math.sum function.
		  (import "math" "sum" (func $sum (param i32 i32) (result i32)))

		  ;; We export an add_one function.
		  (func (export "add_one") (param $x i32) (result i32)
		    local.get $x
		    i32.const 1
		    call $sum))
	`),
)

// Let's create a new host function for `math.sum`.
function := wasmer.NewFunction(
	store,

	// The function signature.
	wasmer.NewFunctionType(
		// Parameters.
		wasmer.NewValueTypes(wasmer.I32, wasmer.I32),
		// Results.
		wasmer.NewValueTypes(wasmer.I32)
	),

	// The function implementation.
	func(args []wasmer.Value) ([]wasmer.Value, error) {
		x := args[0].I32()
		y := args[1].I32()

		return []wasmer.Value{wasmer.NewI32(x + y)}, nil
	},
)

// Let's use the new `ImportObject` API…
importObject := wasmer.NewImportObject()

// … to register the `math.sum` function.
importObject.Register(
	"math",
	map[string]wasmer.IntoExtern{
		"sum": function,
	},
)

// Finally, let's instantiate the module, with all the imports.
instance, _ := wasmer.NewInstance(module, importObject)

// And let's call the `add_one` function!
addOne, _ := instance.Exports.GetFunction("add_one")

result, _ := addOne(41)

assert(result, int32(42))
```

A couple of interesting things can be seen here:

1. There is an `Engine` API; more about this in the next section,

2. Host functions are fully implemented in Go; `cgo` is no longer
   necessary when declaring host functions. Moreover, host functions
   no longer receive the famous `context` argument; more on that in a
   second,

3. Host functions can return multiple-values,

4. Host functions can return any error _à la_ Go,

5. The `ImportObject` API allows to register a collection of
   “externals”: `Function`, `Memory` etc., i.e. types that implement
   the `IntoExtern` interface, to a given namespace (here `math`),
   
6. The `Exports` API allows to read any kinds of externals, including
   multiple memories.

The entire API is more Go idiomatic, and very much simpler to use from
our perspective.

### A word about host functions

Previously, a host function had to be declared with a `cgo` mapping:

```go
// extern int32_t sum(void *context, int32_t x, int32_t y);
import "C"

//export sum
func sum(context unsafe.Pointer, x int32, y int32) int32 {
	return x + y
}
```

Now, a host function no longer needs `cgo`. That's a big
user-experience improvement! A host function can be any Go functions
or Go lambda functions.

Also, a host function can now return an error, which was impossible
before. It will automatically translate to a WebAssembly trap (with
the new `Trap` API).

Finally, a host function receive a slice of values and returns another
slices of values, i.e. it supports multi-values!

```go
func sum(args []wasmer.Value) ([]wasmer.Value, error) {
	x := args[0].I32()
	y := args[1].I32()

	return []wasmer.Value{wasmer.NewI32(x + y)}, nil
}
```

Note that a host function manipulates values of kind `Value` to allow
a more unified API.

We are talking about the host function implementation. To create a
proper host function, we use the `NewFunction` function. It is also
possible to create a new host function with
`NewFunctionWithEnvironment` which expects of a function with the
following form:

```go
type MyEnvironment struct {
	shift int32
}

environment := &MyEnvironment {
	shift: 42,
}

hostFunction := wasmer.NewFunction(
	store,

	// The host function signature.
	wasmer.NewFunctionType(
		wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // two i32 params
		wasmer.NewValueTypes(wasmer.I32), // one i32 result
	),

	// Our environment!
	environment,

	// The function implementation.
	func(environment interface{}, args []wasmer.Value) ([]wasmer.Value, error) {
		// Cast to our environment type, and do whatever we want!
		env := environment.(*MyEnvironment)
		e := env.shift;
		x := args[0].I32()
		y := args[1].I32()

		return []wasmer.Value{wasmer.NewI32(e + x + y)}, nil
	},
)
```

The biggest improvement is that the environment can be anything! No
more restriction due to `cgo`. The user is free to store anything
needed.

### A word about exported functions

The `Exports` API provides the following methods: `GetFunction`,
`GetMemory`, `GetGlobal` and `GetMemory`, to get an external by its
name (or simply `Get`).

`GetFunction` returns an exported function with a native Go API,
i.e. a function that can be invoked as `addOne(42)`. It's actually an
alias of `GetRawFunction(name).Native()` (including error handling):

* A _raw function_ is represented by the type `Function`,
* A _native function_ is represented by the type `NativeFunction`.

The `Function` type provides more information about the function
itself, whilst `NativeFunction` serves the purpose of being easy to
use as any Go functions.

```go
addOne, _ := instance.Exports.GetRawFunction("add_one")

fmt.Println(addOne.Type())
fmt.Println(addOne.ParameterArity())
fmt.Println(addOne.ResultArity())

result, _ := addOne.Call(41)
// or
addOneNative := addOne.Native()
result, _ := addOneNative(41)
```

This example illustrates that even if the new API is more Go
idiomatic, it's not at the price of losing information or features.

## Compilers and Engines

Let's talk a moment about compilers and engines. Compilers aim at
compiling the WebAssembly modules into executable codes. Engines drive
the compilation _and_ the execution of the WebAssembly modules. This
design provides a unique flexibility which allows Wasmer to be used in
various contexts.

### Cranelift has a new companion: Singlepass!

The Wasmer runtime provides 3 compilers to compile the WebAssembly
modules into executable codes:

* Singlepass: Super fast compilation times, slow execution times. Not
  prone to JIT-bombs,
  
* Cranelift: Fast compilation times, fast execution times,

* LLVM: Slow compilation times, very fast execution times (close to
  native).

Previously, `wasmer-go` was providing only one compiler:
Cranelift. However, a non-negligible population of our users run small
WebAssemby modules. In that specific case, execution times is not an
issue since it's always be quick, however we must improve the
compilation time. And that's why we are happy to announce that
`wasmer-go` now embeds the Singlepass compiler too by default!

Cranelift will continue to be the default compiler. To change that
behaviour, one needs to create a new configuration for the engine and
use `Config.UseSinglepassCompiler`:

```go
// Configure the engine to use the Singlepass compiler.
config := wasmer.NewConfig().UseSinglepassCompiler()
engine := wasmer.NewEngineWithConfig(config)

// Compile the WebAssembly module.
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)

// Instantiate it, and something with it.
instance, _ := wasmer.NewInstance(module, wasmer.NewImportObject())
```

It's that simple!

We are working on providing the LLVM compiler. It's more challenging
but it's very likely to come soon.

### JIT and Native engines

The Wasmer runtime also provides 3 engines to compile _and_ to execute
the WebAssembly modules. In a nutshell:

* The JIT engine stores the executable code in memory,

* The Native engine stores the executable code in a native shared
  library object (`.so`, `.dylib`, or `.dll` files depending on the
  Operating System it runs),
  
* The Object File engine, which isn't relevant in the context of Go,
  we skip it ([learn
  more](https://github.com/wasmerio/wasmer/tree/d1bd9eac00a3e1d445499e47d8cb3a632985e0c6/lib/engine-object-file).
  
Previously, `wasmer-go` was providing only the JIT engine. Now, it's
our pleasure to announce that the Native engine is now part of the
family!

Note: The Native engine doesn't work with the Singlepass compiler yet.

The difference is how the executable code is stored, especially when
serializing and deserializing a compiled WebAssembly module; let's
see:

```go
// Configure the engine to use the Cranelift compiler with the Native
// engine.
config := wasmer.NewConfig().UseCraneliftCompiler().UseNativeEngine()
engine := wasmer.NewEngineWithConfig(config)

// Compile the WebAssembly module.
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)

// It's time to save this compiled WebAssembly module!
serializedModule, _ := module.Serialize()
_ := ioutil.WriteFile("my_wasm_module.so", serializedModule, 0644)

// … later… in another galaxy, far far away…

serializedModule, _ := ioutil.ReadFile("my_wasm_module.so")
module, _ := wasmer.DeserializeModule(store, serializedModule)

// And instantiate it!
instance, _ := wasmer.NewInstance(module, wasmer.NewImportObject())
```

Deserializing a compiled WebAssembly module with the Native engine is
generally faster as it requires less operations.

## Cross-compilation

The engines and the compilers have a new very interesting feature:
They can cross-compile. It means that from a machine A with a certain
CPU, it is possible to compile for another machine B with a different
CPU. Introducing the `Target`, `Triple` and `CpuFeatures` API.

Let's say we are on a `aarch64-unknown-linux-gnu` machine, and we want
to compile for an `x86_64-apple-darwin` machine:

```go
// Let's declare the triple of the machine we want to compile for.
triple, _ := wasmer.NewTriple("x86_64-apple-darwin")

// Let's configure the CPU features.
cpuFeatures := wasmer.NewCpuFeatures()
cpuFeatures.Add("sse2")

// Finally, a Target is a pair composed of a Triple and CPU features.
target := wasmer.NewTarget(triple, cpuFeatures)
```

After that, we pass the `Target` to the `Config` API, we compile the
WebAssembly module, and save it:

```go
// Compile for a specific target.
config := wasmer.NewConfig()
config.UseTarget(target)

// Create the engine with a specific configuration.
engine := wasmer.NewEngineWithConfig(config)
store := wasmer.NewStore(engine)

// Let's compile the module for the given target.
module, _ := wasmer.NewModule(store, wasmBytes)

// Serialize the compiled module.
ioutil.Writefile("my_wsam_module.wjit", module.Serialize(), 0644)
```

The serialized compiled module can be then deserialized on the
targeted machine, instantiated, and executed!

That way, it is easier to pre-compile any WebAssembly modules for a
variety of machines!

## WASI

The `wasmer-go` package now features
[WASI](https://github.com/WebAssembly/wasi) (The WebAssembly System
Interface), with all the snapshot previews; understand, all the
versions.

First, the `GetWasiVersion` function can be used to know which version
of WASI a WebAssembly module is using or whether it's not using WASI
at all:

```go
engine := wasmer.NewEngine()
store := wasmer.NewStore()
module, _ := wasmer.NewModule(store, wasmBytes)

fmt.Println(GetWasiVersion(module))
```

Second, to setup WASI, it's required to start by creating a
`WasiEnvironment` with the help of the `NewWasiStateBuilder` API. The
generated `WasiEnvironment` object is then used to generate an
`ImportObject`. This later contains all the imports that “bridge” the
WebAssembly module to the host to make WASI a reality. Of course, it's
possible to use this `ImportObject` to import your own host functions,
memories etc., just like with any `ImportObject`. `WasiEnvironment` is
also responsible to read the `stdout` and `stderr` streams if they are
captured.

Let's see with an example. We want to execute [this Rust
program](https://github.com/wasmerio/wasmer-go/blob/794da4bc5618f7e5f8e6f046d765033372763824/wasmer/testdata/wasi.rs),
that prints its arguments, its environment variables, and that lists
the content of its current working directory.

```go
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)

// We specify the program name: `test-program`. We also specify the
// program is invoked with the `--test` argument, in addition to two
// environment variables: `COLOR` and `APP_SHOULD_LOG`. Finally, we map
// the `the_host_current_directory` to the current directory.
wasiEnv, _ := wasmer.NewWasiStateBuilder("wasi-test-program").
	Argument("--test")
	Environment("COLOR", "true")
	Environment("APP_SHOULD_LOG", "false")
	MapDirectory("the_host_current_directory", ".").
	CaptureStdout()
	Finalize()

// Get the import object!
importObject, _ := wasiEnv.GenerateImportObject(store, module)

// Finally, let's instantiate the module.
instance, _ := wasmer.NewInstance(module, importObject)
```

At this step, the WebAssembly module is ready to be executed. Which
exported function should be called from the instance to start the
program? Think no longer, and let's use
`Exports.GetWasiStartFunction`:

```go
start, _ := instance.Exports.GetWasiStartFunction()
start()
```

Did you notice that `stdout` is expected to be captured, as defined
by `CaptureStdout`? Well, here it is:

```go
stdout := string(wasiEnv.ReadStdout())

fmt.Println(stdout)
```

It prints:

```
Found program name: `wasi_test_program`
Found 1 arguments: --test
Found 2 environment variables: COLOR=true, APP_SHOULD_LOG=false
Found 1 preopened directories: DirEntry("/the_host_current_directory")
```

If `CaptureStdout` isn't called, or if `InheritStdout` is called (its
opposite function), the `stdout` stream from Go will be used
transparently.

## Ready to use on major platforms and architectures

One of the promises of WebAssembly is its _universality_. By design, it
aims at being run anywhere.

`wasmer-go` embeds the Wasmer runtime as native shared object library
(`.so`, `.dylib` etc.) for the following platforms:

* Linux on `amd64`,
* Linux on `arm64`,
* Darwin on `amd64`.

More is coming very soon, like Windows, Linux with `musl` etc.

If you want a specific Wasmer built, we got you covered with the
`custom_wasmer_runtime` build tag.

```shell
$ # Configure cgo.
$ export CGO_CFLAGS="-I/path/to/include/"
$ export CGO_LDFLAGS="-Wl,-rpath,/path/to/lib/ -L/path/to/lib/ -lwasmer_go"
$ 
$ # Run the tests to check everything is correct.
$ go test -tags custom_wasmer_runtime
```

## What people says about the 1.0? [or] Benchmarks?

(not sure about this section)

We would like to thank the numerous users that have provided feedbacks
along the way and during the rewrite. It's been precious!

According to [Connor Hicks](https://twitter.com/cohix), the main
developer of [Suborbital](https://suborbital.dev/), the migration from
`wasmer-go` 0.3 to 1.0 led to a speed up between 4-10x.

We should re-run the benchmarks from the 0.3 to compare the perf' with
the 1.0 maybe?

## Conclusion

The 1.0 version is more than performance improvements: it provides a
stable and powerful API that fulfill more people needs. We believe
that the new design, the 2 compilers, the 2 engines, is a great
improvement and provide more flexibility.

With the help of the new cross-compilation API, we believe that it's
easier than ever to execute WebAssembly anywhere.

Documentation and examples have been meticulously written to help
users new to WebAssembly, or to help advanced users. We believe it
will facilitate the usage of WebAssembly in the Go ecosystem.

[Join a community of more than 1300 Go and WebAssembly passionate
developers!](https://github.com/wasmerio/wasmer-go).
