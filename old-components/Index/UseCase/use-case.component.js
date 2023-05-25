import React from 'react';
import cases from './use-case.constants';
import styles from './use-case.module.css';
import { CardComponent } from '../../Card/card.component';

export const UseCaseComponent = () => {
  return (
    
    <div
      className={`
        container
        ${styles.container}
      `}
    >
      <div><br></br><h2 className="font-bold mb-4">Powered by Wasmer</h2><br></br></div>
      <div className="-mx-4 md:mx-0 grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-page">
        {cases.map(({ text, link, icon }) => (
          <CardComponent
            key={text}
            className={`${styles.card} ${styles.cardContentBehaviour}`}
            text={text}
            link={link}
            icon={icon}
          />
        ))}
      </div>
    </div>
  );
};
