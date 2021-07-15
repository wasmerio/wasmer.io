import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    AiComponent,
} from '../components';
import {
    HeroComponent,
    GridComponent
} from '../components/Comparison'

export default function Ai() {
    return (
            <>
            <Head>
                <title>Wasmer for AI</title>
                <meta name="title" content="Wasmer for AI" key="title" />
            </Head>            
            <AiComponent></AiComponent>
            <TrustedByComponent/>
            </>
  );
}