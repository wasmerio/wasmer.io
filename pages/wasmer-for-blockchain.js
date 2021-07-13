import React from 'react';
import Head from 'next/head';
import {
    TrustedByComponent,
    CaseStudyComponent,
} from '../components';
import {
    HeroComponent,
    GridComponent
} from '../components/Comparison'

export default function WasmerOpenSourceProgram() {
    return (
            <>
            <Head>
                <title>Wasmer Open Source Program</title>
                <meta name="title" content="Wasmer Open Source Program" key="title" />
            </Head>            
            <CaseStudyComponent></CaseStudyComponent>
            <TrustedByComponent/>
            </>
  );
}