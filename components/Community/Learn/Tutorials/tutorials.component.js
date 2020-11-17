import React from 'react';
import { CardComponent } from '../../../Card/card.component';
import tutorials from './tutorials.constants';
import styles from './tutorials.module.css';

export const TutorialsComponent = () => {
  return (
    <div
      className={`flex flex-col mt-dot-2 mb-dot-3 lg:mx-auto ${styles.root}`}
    >
      {tutorials.map(({ text, link, icon }, index) => (
        <div
          className={`${styles.cardContainer} ${styles.cardContentBehaviour}`}
          key={index}
        >
          <div className={styles.card}>
            <CardComponent
              small
              secondary
              text={text}
              link={link}
              icon={icon}
              target="_blank"
              className="h-full w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
