use js_sys::Uint8Array;
use std::error::Error;
use wasm_bindgen::prelude::*;
use wasmer::{Instance, Module, Store};
use wasmer_wasi::{Pipe, WasiState};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(value: &str);
}

#[wasm_bindgen]
pub fn run(program_name: String, wasm_bytes: Uint8Array) {
    match _run(program_name, wasm_bytes) {
        Ok(_) => (),
        Err(error) => log(&error.to_string()),
    };
}

fn _run(program_name: String, wasm_bytes: Uint8Array) -> Result<(), Box<dyn Error>> {
    // Create the store.
    let store = Store::default();

    // Compile the WebAssembly module received as bytes.
    let module = Module::new(&store, wasm_bytes.to_vec())?;

    log("== Module introspection\n\n");
    log(&format!(
        "== Module imports\n=== {}\n\n",
        module
            .imports()
            .map(|import| format!("{:?}", import))
            .collect::<Vec<String>>()
            .join("\n=== ")
    ));
    log(&format!(
        "== Module exports\n=== {}\n\n",
        module
            .exports()
            .map(|export| format!("{:?}", export))
            .collect::<Vec<String>>()
            .join("\n=== ")
    ));

    // Setup WASI.
    let mut wasi_env = WasiState::new(program_name)
        .stdout(Box::new(Pipe::new()))
        .finalize()?;

    // Get an import object that is pre-configured for WASI.
    let import_object = wasi_env.import_object(&module)?;

    // Let's instantiate the Wasm module!
    let instance = Instance::new(&module, &import_object)?;

    // Start the WASI module by calling its `_start` function (aka
    // `main`).
    let start = instance.exports.get_function("_start")?;
    start.call(&[])?;

    // Fetch the content of the WASI stdout buffer.
    let mut state = wasi_env.state();
    let wasi_stdout = state.fs.stdout_mut()?.as_mut().unwrap();

    let mut stdout_content = String::new();
    wasi_stdout.read_to_string(&mut stdout_content)?;

    log("== WASI stdout\n\n");
    log(&stdout_content);
    log("\n\n== Over.");

    Ok(())
}
