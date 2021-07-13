import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    HotgComponent,
} from '../../components';
import {
    HeroComponent,
    GridComponent
} from '../../components/Comparison'

export default function Hotg() {
    return (
            <>
            <Head>
                <title>Wasmer Open Source Program</title>
                <meta name="title" content="Wasmer Open Source Program" key="title" />
            </Head>            
            <HotgComponent></HotgComponent>
            <TrustedByComponent/>
            </>
  );
}