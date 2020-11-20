import React from 'react';
import { ColorDots } from '../../ColorDots/color-dots.component';
import styles from './grid.module.css';

export const GridComponent = ({
  children,
  reversed,
  hero,
  heroSingle,
  plain,
  title,
  text,
  gridLabel,
  gridContainerClasses,
  rootClasses,
  fullWidth,
  noTopMargin,
  noBottomMargin,
}) => {
  return (
    <div
      className={`
      w-full overflow-hidden my-page
      ${styles.root}
      ${reversed ? styles.reversed : ''}
      ${hero ? styles.hero : ''}
      ${heroSingle ? styles.heroSingle : ''}
      ${plain ? styles.plain : ''}
      ${fullWidth ? styles.fullWidth : ''}
      ${noTopMargin ? styles.noTopMargin : ''}
      ${noBottomMargin ? styles.noBottomMargin : ''}
      ${rootClasses}
    `}
    >
      <div className={`container ${styles.rootContainer}`}>
        {!fullWidth && (
          <div className={styles.text}>
            <h2 className="font-bold">{title}</h2>
            <p className="mt-4">{text}</p>
          </div>
        )}
        <div
          className={`${styles.gridContainer} ${gridContainerClasses} -mx-8 md:mx-0`}
        >
          <div className={`dot-background dot-grid ${styles.grid}`}>
            <ColorDots variant={reversed ? (plain ? 'right-m12' : 'right') : (plain ? 'm12' : '')} />
          </div>
          {children}
          <div>
            {gridLabel && (
              <div className={`label ${styles.gridLabel}`}>
                <span>{gridLabel}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
