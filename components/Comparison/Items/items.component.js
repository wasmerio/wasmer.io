import React from 'react';
import styles from './items.module.css';
import Link from 'next/link';
import { LanguageComponent } from '../../Languages/Language.component';

export const ItemsComponent = ({ repository, competitorName, reversed }) => {
  const wasmer = repository[0];
  const competitor = repository[1];
  return (
    <div
      className={`
      ${styles.root}
      ${reversed ? styles.reversed : ''}
    `}
    >
      {/** Wasmer items */}
      <div className={`label ml-dot-1 mt-dot-2 ${wasmer.labelColor}`}>
        <span>Wasmer</span>
      </div>
      <div className="grid-container flex flex-wrap -mb-dot-1">
        {wasmer.items.map((item, index) => (
          <div className="ml-dot-1 mb-dot-1" key={index}>
            <LanguageComponent
              className={`
                ${!item ? styles.empty : ''}
              `}
              icon={item.icon}
              link={item.link}
              highlighted
            />
          </div>
        ))}
      </div>
      {/** Competitor items */}
      <div className="label ml-dot-1 mt-dot-2 text-grey-60">
        <span>{competitorName}</span>
      </div>
      <div className="grid-container flex flex-wrap -mb-dot-1">
        {competitor.items.map((item, index) => (
          <div className="ml-dot-1 mb-dot-1" key={index}>
            <LanguageComponent
              className={`
                ${!item ? styles.empty : ''}
              `}
              icon={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
