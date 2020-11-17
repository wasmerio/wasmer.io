import React from 'react';
import Head from 'next/head';

import {
  PackagesComponent,
  ContactComponent,
  TrustedByComponent,
  LinkComponent,
} from '../components';
import {
  ContributeComponent,
  HeroComponent,
  JoinComponent,
  LearnComponent,
} from '../components/Community';

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>Wasmer Community</title>
        <meta name="title" content="Wasmer Community" key="title" />
      </Head>
      <HeroComponent />
      <JoinComponent />
      <LearnComponent />
      <ContributeComponent />
      <PackagesComponent action="publish" variant="dark" />
      <ContactComponent
        title={
          <>
            <strong className="block">Ready for a universal runtime?</strong>{' '}
            Stay in touch and get involved.
          </>
        }
      >
        <LinkComponent
          isButton
          secondary
          linkText="Go to Twitter"
          href="https://twitter.com/wasmerio"
          target="_blank"
        />
        <LinkComponent
          isButton
          linkText="Go to Blog"
          href="https://medium.com/wasmer"
          target="_blank"
        />
      </ContactComponent>
      <TrustedByComponent />
    </>
  );
}
