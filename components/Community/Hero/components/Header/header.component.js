import React from 'react';
import {
  GithubCounterComponent,
  LinkComponent,
} from '../../../../../components';
import styles from './header.module.css';

export const HeaderComponent = () => {
  return (
    <div className={styles.container}>
      <h1 className="font-bold">
        <GithubCounterComponent animate /> Github stars and counting.
      </h1>
      <p className="mt-4 lg:mt-6 xl:mt-8 mb-8 lg:mb-10 xl:mb14">
        Join the Wasmer community and be part of the next generation of
        software.
      </p>
      <LinkComponent
        isButton
        secondary
        linkText="Go to Github"
        href="https://github.com/wasmerio"
        target="_blank"
        rel="noopener noreferrer"
      />
    </div>
  );
};
