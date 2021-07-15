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
                <title>Wasmer HOTG.ai Case Study</title>
                <meta name="title" content="Wasmer HOTG.ai Case Study" key="title" />
            </Head>            
            <HotgComponent></HotgComponent>
            <TrustedByComponent/>
            </>
  );
}