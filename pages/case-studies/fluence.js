import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    FluenceComponent,
} from '../../old-components';
import {
    HeroComponent,
    GridComponent
} from '../../old-components/Comparison'

export default function Fluence() {
    return (
            <>
            <Head>
                <title>Wasmer Fluence Labs Case Study</title>
                <meta name="title" content="Wasmer Fluence Labs Case Study" key="title" />
            </Head>            
            <FluenceComponent></FluenceComponent>
            <TrustedByComponent/>
            </>
  );
}