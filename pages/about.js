import React from 'react';
import Head from 'next/head';

import { IntroComponent, TeamComponent } from '../components/About';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Wasmer</title>
        <meta name="title" content="About Wasmer" key="title" />
      </Head>
      <IntroComponent />
      <TeamComponent />
    </>
  );
}
