import React from 'react';
import styles from './stepper.module.css';

export const StepperComponent = () => {
  return (
    <ul className={styles.root}>
      <li>
        <div className={`${styles.wrapper} ${styles.base}`}>
          <div
            className={`${styles.circle} ${styles.base} ${styles.left}`}
          ></div>
          <div
            className={`${styles.circle} ${styles.base} ${styles.right}`}
          ></div>
        </div>
        <div className={styles.counter}>1</div>
        <div className="ml-6 leading-tight">Install</div>
      </li>
      <li>
        <div className={styles.counter}>2</div>
        <div className={`${styles.wrapper} ${styles.base} ${styles.second}`}>
          <div
            className={`${styles.circle} ${styles.base} ${styles.second} ${styles.left}`}
          ></div>
          <div
            className={`${styles.circle} ${styles.base} ${styles.second} ${styles.right}`}
          ></div>
        </div>
        <div className="ml-6 leading-tight">Run</div>
      </li>
    </ul>
  );
};
