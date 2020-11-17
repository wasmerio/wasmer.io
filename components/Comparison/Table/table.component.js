import React from 'react';
import styles from './table.module.css';

export const TableComponent = ({
  competitorName,
  competitorItems,
  items,
  reversed,
  variant,
}) => {
  const color =
    variant === 'secondary'
      ? 'bg-secondary shadow-lightpurple'
      : 'bg-primary shadow-darkpurple';
  const labelColor = variant || 'primary';
  return (
    <div
      className={`
      ${styles.root}
      ${reversed ? styles.reversed : ''}
      -mb-dot-1
    `}
    >
      <div className="flex">
        <div className="grid-container mr-dot-2">
          <div className={`label text-${labelColor}`}>
            <span>Wasmer</span>
          </div>
          {items.map((item, index) => (
            <div className="flex mb-dot-1" key={index}>
              <div
                className={`grid-box extended items-end text-white ${color} relative h-dot-2 lg:h-dot-3 w-dot-4 lg:w-dot-5`}
              >
                <span className="boxedLabel">{item}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid-container">
          <div className="label text-grey-60">
            <span>{competitorName}</span>
          </div>
          {competitorItems.map((item) => (
            <div className="flex mb-dot-1">
              <div
                className={`grid-box extended items-end bg-lightgrey text-grey-60 relative h-dot-2 lg:h-dot-3 w-dot-4 lg:w-dot-5 ${
                  !item ? styles.empty : ''
                }`}
              >
                {item && <span className="boxedLabel">{item}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
