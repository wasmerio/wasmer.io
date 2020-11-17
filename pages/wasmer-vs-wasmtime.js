import React from 'react';
import Head from 'next/head';

import {
  TrustedByComponent,
  ContactComponent,
  LinkComponent,
} from '../components';
import {
  HeroComponent,
  QuoteComponent,
  GridComponent,
  BarsVerticalComponent,
  BarsHorizontalComponent,
  ItemsComponent,
  TableComponent,
} from '../components/Comparison';
import { wasmtime } from '../components/Comparison/Items/items.constants';

export default function WasmerWasmtimePage() {
  const competitorName = 'Wasmtime';
  return (
    <>
      <Head>
        <title>Wasmer vs Wasmtime</title>
        <meta name="title" content="Wasmer vs Wasmtime" key="title" />
      </Head>
      <HeroComponent
        firstLine="Wasmtime did the basics."
        secondLine={
          <span>
            Wasmer added your language <br className="hidden md:inline" />
            and skyrocketed speed.
          </span>
        }
        subline="Developers and enterprises prefer Wasmer for its incredible performance and flexibility."
      />
      <GridComponent hero fullWidth noTopMargin noBottomMargin>
        <BarsHorizontalComponent
          fullWidth
          variant="secondary"
          competitorName={competitorName}
          progress={1}
          unit="1000x"
          barLabel="Startup speed"
        />
      </GridComponent>
      <GridComponent
        hero
        noTopMargin
        title="Stunning speed"
        text="Wasmer is designed from the ground up to match the speed of native executables. Experience startup performance unlike any other."
      >
        <BarsHorizontalComponent
          hero
          reversed
          competitorName={competitorName}
          progress={50}
          unit="2x"
          barLabel="Execution speed"
        />
      </GridComponent>
      <QuoteComponent
        text="I gotta say, I really like this very much"
        author="Solomon Hykes, former CTO of Docker"
      />
      <GridComponent
        title="Lightweight headless mode"
        text="Wasmer ships with a headless mode that allows running precompiled Wasm files in the most lightweight way."
        gridLabel="Bundle size"
      >
        <BarsVerticalComponent
          unit="mb"
          flatten
          value={1}
          competitorValue={11}
          competitorName={competitorName}
        />
      </GridComponent>
      <GridComponent
        reversed
        title="Flexible compiler support"
        text="No matter if you are focusing on development speed or runtime performance – Wasmer supports the right runtime for the right application."
        gridLabel="Compilers"
      >
        <TableComponent
          reversed
          items={['Cranelift', 'Singlepass', 'LLVM']}
          competitorItems={['Cranelift', '', '']}
          competitorName={competitorName}
        />
      </GridComponent>
      <GridComponent
        title="Favorite language integration"
        text="Wasmer aims to enable all devs to use Wasm. It supports a wide range of languages that enables you to use Wasm, no matter what language you are coding in."
        gridLabel="Supported languages"
        gridContainerClasses="md:w-1/2"
      >
        <ItemsComponent repository={wasmtime} competitorName={competitorName} />
      </GridComponent>
      <QuoteComponent
        variant="secondary"
        text="I gotta say, I really like this very much"
        author="Solomon Hykes, former CTO of Docker"
      />

      <ContactComponent
        title={
          <>
            <strong className="block">Ready for a universal runtime?</strong>{' '}
            Stay in touch and get involved.
          </>
        }
      >
        <LinkComponent
          isButton
          secondary
          linkText="Go to Forum"
          href="https://spectrum.chat/wasmer"
          target="_blank"
        />
        <LinkComponent
          isButton
          linkText="Go to Blog"
          href="https://medium.com/wasmer"
          target="_blank"
        />
      </ContactComponent>
      <TrustedByComponent />
    </>
  );
}
