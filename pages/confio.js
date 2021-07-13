import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    ConfioComponent,
} from '../components';
import {
    HeroComponent,
    GridComponent
} from '../components/Comparison'

export default function Confio() {
    return (
            <>
            <Head>
                <title>Wasmer Open Source Program</title>
                <meta name="title" content="Wasmer Open Source Program" key="title" />
            </Head>            
            <ConfioComponent></ConfioComponent>
            <TrustedByComponent/>
            </>
  );
}