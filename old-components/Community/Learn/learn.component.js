import React from 'react';
import { LinkComponent } from '../..';
import { TutorialsComponent } from './Tutorials/tutorials.component.js';
import { GridComponent } from '../../Comparison';
import styles from './learn.module.css';

export const LearnComponent = () => {
  return (
    <GridComponent
      title="Learn Wasmer"
      reversed
      plain
      gridContainerClasses={`${styles.root}`}
      rootClasses="pt-page-1/2 md:pt-0"
      text={
        <>
          <p className="mb-3 text">Developing WebAssembly apps is complex.</p>
          <p className="mb-6 min-w-1/2 text">
            Check out our easy-to-follow tutorials and get up to speed on
            WebAssembly, Wasmer and the future of universal runtimes.
          </p>
          <LinkComponent secondary linkText="See all Tutorials" href="https://docs.wasmer.io/integrations/examples" />
        </>
      }
    >
      <div className="">
        <TutorialsComponent />
      </div>
    </GridComponent>
  );
};
