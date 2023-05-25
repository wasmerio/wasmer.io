import React from 'react';
import styles from './bars-vertical.module.css';

export const BarsVerticalComponent = ({
  competitorName,
  competitorValue,
  unit,
  reversed,
  value,
  flatten,
}) => {
  const getHeight = (value, competitorValue) => {
    return Math.round((value / competitorValue) * 100);
  };
  const competitorHeight = 11;
  const height = getHeight(value, competitorValue);
  return (
    <div
      className={`
      ${styles.root}
      ${reversed ? styles.reversed : ''}
    `}
    >
      <div className={`grid-container ${styles.barContainer} ${styles.wasmer}`}>
        <div className={`flex flex-col justify-end h-dot-${competitorHeight}`}>
          <span className="label boxedLabel">
            <span className="text-secondary">
              {value}
              {unit}
            </span>
          </span>
          <div
            className={`${flatten ? 'py-0' : ''} ${styles.bar} ${
              styles.highlighted
            }`}
            style={{ height: `${height}%` }}
          />
        </div>
        <span className="label text-secondary">
          <span>Wasmer</span>
        </span>
      </div>
      <div className={`grid-container ${styles.barContainer}`}>
        <div className={`grid-box ${styles.bar} h-dot-${competitorHeight}`}>
          <span className="boxedLabel text-grey-60">
            {competitorValue}
            {unit}
          </span>
        </div>
        <span className="label text-grey-60">
          <span>{competitorName}</span>
        </span>
      </div>
    </div>
  );
};
