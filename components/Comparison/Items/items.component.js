import React from 'react';
import styles from './items.module.css';
import Link from 'next/link';

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
            <Link href={item.link}>
              <a
                className={`grid-box extended text-white ${wasmer.itemsColor} relative h-dot-2 lg:h-dot-3 w-dot-2 lg:w-dot-3  ${styles.link}`}
                target="_blank"
              >
                <div className="absolute top-0 left-0 w-full h-full lg:p-1 filter-white">
                  {item.icon}
                </div>
              </a>
            </Link>
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
            <a
              className={`grid-box extended text-white ${
                item ? competitor.itemsColor : 'bg-white'
              } relative h-dot-2 lg:h-dot-3 w-dot-2 lg:w-dot-3 ${
                !item ? styles.empty : ''
              }`}
            >
              {item && (
                <div className="absolute top-0 left-0 w-full h-full lg:p-1 fill-lightgrey">
                  {item}
                </div>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
