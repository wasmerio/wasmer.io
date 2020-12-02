import React from 'react';
import Head from 'next/head';

import {
  ContactComponent,
  LinkComponent,
  TrustedByComponent,
} from '../components';
import {
  HeroComponent,
  QuoteComponent,
  GridComponent,
  BarsHorizontalComponent,
  ItemsComponent,
  TableComponent,
} from '../components/Comparison';
import { lucet } from '../components/Comparison/Items/items.constants';

export default function WasmerLucetPage() {
  const competitorName = 'Lucet';
  return (
    <>
      <Head>
        <title>Wasmer vs Lucet</title>
        <meta name="title" content="Wasmer vs Lucet" key="title" />
      </Head>
      <HeroComponent
        firstLine="Lucet made Wasm fast."
        secondLine={
          <span>
            Wasmer doubled the speed <br className="hidden md:inline" />
            and added accessibilty.
          </span>
        }
        subline="Developers and enterprises prefer Wasmer for its incredible performance and flexibility."
      />
      <GridComponent
        heroSingle
        noTopMargin
        title="Stunning speed"
        text="Wasmer delivers super fast startup time and unbeatable runtime speed, thanks to the LLVM native backend."
        gridLabel="Execution speed"
      >
        <BarsHorizontalComponent
          progress={26}
          competitorName="Lucet"
          unit="2.5x"
        />
      </GridComponent>
      <QuoteComponent
        text="Wasmer is really flexible and easy to integrate, with incredible documentation"
        author="Quentin Adam, Clever Cloud CEO"
      />

      <GridComponent
        reversed
        title="Truly multiplatform"
        text="Wasmer can be run on almost any platform."
        gridLabel="Supported environments"
      >
        <TableComponent
          reversed
          variant="primary"
          items={['Linux', 'Max', 'Windows']}
          competitorItems={['Linux', 'Mac (exp.)', '']}
          competitorName={competitorName}
        />
      </GridComponent>
      <GridComponent
        title="Full chipset support"
        text="Thanks to the usage of LLVM, Wasmer supports a broad range of chipsets, including x86 and aarch64 (ARM). So whatever chip you use – Wasmer will run on it."
        gridLabel="Supported chipsets"
      >
        <TableComponent
          variant="secondary"
          items={['x86_64', 'ARM64', 'Apple M1', 'x86', 'ARM']}
          competitorItems={['x86_64', '', '', '', '']}
          competitorName={competitorName}
        />
      </GridComponent>

      <GridComponent
        reversed
        title="Incredible Flexibility"
        text="One compiler doesn’t fit all sizes. Sometimes you want to focus on development speed (for which Cranelift is great), and other times you want to optimize for runtime performance… for which LLVM is unbeatable."
        gridLabel="Supported Environments"
      >
        <TableComponent
          reversed
          variant="primary"
          items={['Cranelift', 'Singlepass', 'LLVM']}
          competitorItems={['Cranelift', '', '']}
          competitorName={competitorName}
        />
      </GridComponent>

      <GridComponent
        title="Favorite language integration"
        text="Wasmer aims to enable all devs to use Wasm. It supports a wide range of languages that enables you to use Wasm, no matter what language you are coding in."
        gridLabel="Supported Languages"
        gridContainerClasses="md:w-1/2"
      >
        <ItemsComponent repository={lucet} competitorName={competitorName} />
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
