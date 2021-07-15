import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    FluenceComponent,
} from '../../components';
import {
    HeroComponent,
    GridComponent
} from '../../components/Comparison'

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