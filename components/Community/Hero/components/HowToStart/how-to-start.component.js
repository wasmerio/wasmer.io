import React from 'react';
import cases from './how-to-start.constants';
import styles from './how-to-start.module.css';
import { CardComponent } from '../../../../Card/card.component';

export const HowToStartComponent = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center lg:flex-col mt-dot-2 mb-dot-4 md:mx-dot-2 lg:mx-auto">
      {cases.map(({ text, link, icon }, index) => (
        <div className={styles.cardContainer} key={index}>
          <div className={styles.card}>
            <CardComponent
              small
              lightgrey
              text={text}
              link={link}
              icon={icon}
              target="_blank"
              className={`h-full w-full ${styles.cardContentBehaviour}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
