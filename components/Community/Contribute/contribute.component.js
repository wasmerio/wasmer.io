import React from 'react';
import { LinkComponent } from '../..';
import { GridComponent } from '../../Comparison';
import styles from './contribute.module.css';

export const ContributeComponent = () => {
  return (
    <GridComponent
      title="Contribute"
      plain
      text={
        <>
          <p className="mb-3 text">
            Wasmer is 100% open source, and appreciates contributions to code
            and documentation.
          </p>
          <p>
            Besides eternal glory, significant contributions will earn you a
            contributor t-shirt!
          </p>
        </>
      }
      gridContainerClasses={styles.contributeGridContainer}
    >
      <div className={styles.root}>
        <div className={styles.buttonGroup}>
          <LinkComponent
            isButton
            linkText="Submit a PR"
            href="https://github.com/wasmerio/wasmer/pulls"
            className={styles.button}
          />
          <LinkComponent
            isButton
            linkText="Report an Issue"
            href="https://github.com/wasmerio/wasmer/issues"
            className={styles.button}
          />
        </div>
        <div className={styles.buttonGroup}>
          <LinkComponent
            isButton
            secondary
            linkText="Improve the Docs"
            href="https://github.com/wasmerio/docs.wasmer.io"
            className={styles.button}
          />
          <LinkComponent
            isButton
            secondary
            linkText="Write a Tutorial"
            href="https://github.com/wasmerio/docs.wasmer.io/tree/master/integrations/examples"
            className={styles.button}
          />
        </div>
        <div className={styles.buttonGroup}>
          <LinkComponent
            isButton
            grey
            linkText="Join our Team"
            href="https://www.workatastartup.com/companies/12675"
            className={styles.button}
          />
        </div>
      </div>
    </GridComponent>
  );
};
