import React from 'react';
import styles from './bars-horizontal.module.css';

export const BarsHorizontalComponent = ({
  competitorName,
  progress,
  reversed,
  hero,
  variant,
  fullWidth,
  unit,
  barLabel,
}) => {
  const getWidth = (width, progress) => {
    return Math.round(width * (progress / 100)) + 1;
  };
  const color =
    variant === 'secondary'
      ? 'bg-secondary shadow-lightpurple'
      : 'bg-primary shadow-darkpurple';
  const labelColor = variant || 'primary';
  const mainWidth = 9;
  const mainWidthLarge = 12;
  const competitorWidth = getWidth(mainWidth, progress);
  const competitorWidthLarge = getWidth(mainWidthLarge, progress);

  return (
    <div
      className={`
      ${styles.root}
      ${reversed ? styles.reversed : ''}
      ${hero ? styles.hero : ''}
      ${fullWidth ? styles.fullWidth : ''}
    `}
    >
      <div
        className={`
        grid-container
        ${styles.barGridContainer}
      `}
      >
        {barLabel && (
          <div className={`label text-${labelColor} mb-dot-1`}>
            <span>{barLabel}</span>
          </div>
        )}
        <div className="flex">
          <div
            className={`z-10 grid-box extended items-end justify-between text-white ${color} relative h-dot-2 lg:h-dot-3 w-dot-9 lg:w-dot-12 ${styles.gridBox}`}
          >
            {fullWidth && <div className={styles.barBackgroundHelper} />}
            <span className="p-1 font-semibold">Wasmer</span>
            <span className={`boxedLabel ${fullWidth ? 'mr-2 lg:mr-4' : ''}`}>
              {unit}
            </span>
          </div>
        </div>
        <div className="flex mt-dot-1">
          <div className="grid-box w-full h-dot-2 lg:h-dot-3">
            <div
              className={`grid-box-absolute extended bg-white inset-0 h-dot-2 lg:h-dot-3 w-dot-${competitorWidth} lg:w-dot-${competitorWidthLarge}`}
            />
            <div
              className="grid-box-absolute extended bg-lightgrey inset-0 items-end h-dot-2 lg:h-dot-3"
              style={{ width: `${progress}%` }}
            >
              {!fullWidth && (
                <span className="p-1 font-semibold text-grey-60">
                  {competitorName}
                </span>
              )}
            </div>
            {fullWidth && (
              <span className="z-10 ml-4 md:ml-6 p-1 font-semibold self-end bg-white p-2 -mb-3 text-grey-60">
                {competitorName}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
