import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    BlockchainComponent,
} from '../components';
import {
    HeroComponent,
    GridComponent
} from '../components/Comparison'

export default function Blockchain() {
    return (
            <>
            <Head>
                <title>Wasmer for Blockchain</title>
                <meta name="title" content="Wasmer for Blockchain" key="title" />
            </Head>            
            <BlockchainComponent></BlockchainComponent>
            <TrustedByComponent/>
            </>
  );
}