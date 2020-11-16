import React from 'react';
import { LinkComponent } from '../../Link/link.component';

export const JoinComponent = () => {
  return (
    <div className="text-left md:text-center container my-page">
      <h2 className="md:mx-auto mb-8 lg:mb-10 xl:mb-12 max-w-md md:max-w-none">
        Active and engaging – join a vivid <br className="hidden md:inline" />
        community of talented devs with a vision.
      </h2>
      <LinkComponent
        isButton
        linkText="Join Slack"
        href="https://slack.wasmer.io/"
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
};
