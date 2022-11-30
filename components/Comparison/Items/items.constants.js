import React from 'react';
import C from '../../../public/images/languages/c.svg';
import CPP from '../../../public/images/languages/cpp.svg';
import CSharp from '../../../public/images/languages/c-sharp.svg';
import Elixir from '../../../public/images/languages/elixir.svg';
import GO from '../../../public/images/languages/go.svg';
import Java from '../../../public/images/languages/java.svg';
import JavaScript from '../../../public/images/languages/javascript.svg';
import PHP from '../../../public/images/languages/php.svg';
import Postgres from '../../../public/images/languages/postgress.svg';
import Python from '../../../public/images/languages/python.svg';
import R from '../../../public/images/languages/r.svg';
import Ruby from '../../../public/images/languages/ruby.svg';
import Rust from '../../../public/images/languages/rust.svg';

const wasmerItems = [
  {
    icon: <GO key={1} />,
    link: 'https://github.com/wasmerio/wasmer-go',
  },
  {
    icon: <Rust key={2} />,
    link: 'https://github.com/wasmerio/wasmer-rust-example',
  },
  {
    icon: <Python key={3} />,
    link: 'https://github.com/wasmerio/wasmer-python',
  },
  {
    icon: <Ruby key={2} />,
    link: 'https://github.com/wasmerio/wasmer-ruby',
  },
  {
    icon: <JavaScript key={4} />,
    link: 'https://github.com/wasmerio/wasmer-js',
  },
  {
    icon: <C key={5} />,
    link: 'https://github.com/wasmerio/wasmer-c-api',
  },
  {
    icon: <CPP key={6} />,
    link: 'https://github.com/wasmerio/wasmer-c-api',
  },
  {
    icon: <CSharp key={7} />,
    link: 'https://github.com/migueldeicaza/WasmerSharp',
  },
  {
    icon: <PHP key={8} />,
    link: 'https://github.com/wasmerio/wasmer-php',
  },
  {
    icon: <R key={9} />,
    link: 'https://github.com/dirkschumacher/wasmr',
  },
  {
    icon: <Java key={10} />,
    link: 'https://github.com/wasmerio/wasmer-java',
  },
  {
    icon: <Elixir key={11} />,
    link: 'https://github.com/tessi/wasmex',
  },
  {
    icon: <Postgres key={12} />,
    link: 'https://github.com/wasmerio/wasmer-postgres',
  },
];

export const wasmtime = [
  {
    label: 'Wasmer',
    labelColor: 'text-secondary',
    itemsColor: 'bg-secondary shadow-lightpurple',
    items: wasmerItems,
  },
  {
    label: 'Wasmtime',
    labelColor: 'text-grey-60',
    itemsColor: 'bg-lightgrey',
    items: [
      <Rust key={1} />,
      <C key={2} />,
      <Python key={3} />,
      <GO key={4} />,
    ],
  },
];

export const lucet = [
  {
    label: 'Wasmer',
    labelColor: 'text-secondary',
    itemsColor: 'bg-secondary shadow-lightpurple',
    items: wasmerItems,
  },
  {
    label: 'Lucet',
    labelColor: 'text-grey-60',
    itemsColor: 'bg-lightgrey',
    items: [null],
  },
];

export const wasmedge = [
  {
    label: 'Wasmer',
    labelColor: 'text-secondary',
    itemsColor: 'bg-secondary shadow-lightpurple',
    items: wasmerItems,
  },
  {
    label: 'WasmEdge',
    labelColor: 'text-grey-60',
    itemsColor: 'bg-lightgrey',
    items: [
      <Rust key={1} />,
      <C key={2} />,
      <Python key={3} />,
      <GO key={4} />,
    ],
  },
];
