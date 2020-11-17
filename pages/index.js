import React from 'react';
import {
  GridSeparatorComponent,
  PackagesComponent,
  TrustedByComponent,
  ContactComponent,
  LinkComponent,
} from '../components';
import {
  ExplainerComponent,
  HeroComponent,
  InstallComponent,
  TestimonialsComponent,
  UseCaseComponent,
} from '../components/Index/';

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
          href="https://medium.com/wasmer"
          target="_blank"
        />
        <LinkComponent
          isButton
          secondary
          linkText="Contact Sales"
          href="mailto:sales@wasmer.io"
        />
      </ContactComponent>
      <TrustedByComponent />
    </>
  );
}
