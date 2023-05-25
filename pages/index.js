import React from 'react';
import {
  GridSeparatorComponent,
  PackagesComponent,
  TrustedByComponent,
  ContactComponent,
  LinkComponent,
} from '../old-components';
import {
  ExplainerComponent,
  HeroComponent,
  InstallComponent,
  TestimonialsComponent,
  UseCaseComponent,
} from '../old-components/Index/';

export default function IndexPage() {
  return (
    <>
      <HeroComponent />
      <ExplainerComponent />
      <UseCaseComponent />
      <InstallComponent />
      <PackagesComponent />
      <TestimonialsComponent />
      <GridSeparatorComponent />
      <ContactComponent
        title={
          <>
            <strong>Curious?</strong> Get in touch or <br /> check out our
            forum.
          </>
        }
      >
        <LinkComponent
          isButton
          linkText="Go to Blog"
          href="/posts"
        />
        <LinkComponent
          isButton
          secondary
          linkText="Contact Sales"
          href="mailto:sales@wasmer.io"
          target="_blank"
          rel="noopener noreferrer"
        />
      </ContactComponent>
      <TrustedByComponent />
    </>
  );
}
