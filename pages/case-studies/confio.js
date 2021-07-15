import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    ConfioComponent,
} from '../../components';
import {
    HeroComponent,
    GridComponent
} from '../../components/Comparison'

export default function Confio() {
    return (
            <>
            <Head>
                <title>Wasmer Confio Case Study</title>
                <meta name="title" content="Wasmer Confio Case Study" key="title" />
            </Head>            
            <ConfioComponent></ConfioComponent>
            <TrustedByComponent/>
            </>
  );
}