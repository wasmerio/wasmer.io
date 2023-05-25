import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    FunctionsComponent,
} from '../old-components';
import {
    HeroComponent,
    GridComponent
} from '../old-components/Comparison'

export default function Functions() {
    return (
            <>
            <Head>
                <title>Wasmer for FaaS</title>
                <meta name="title" content="Wasmer for FaaS" key="title" />
            </Head>            
            <FunctionsComponent></FunctionsComponent>
            <TrustedByComponent/>
            </>
  );
}