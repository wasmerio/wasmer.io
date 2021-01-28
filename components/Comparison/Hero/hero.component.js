import React from 'react';
import styles from './hero.module.css';

export const HeroComponent = ({ firstLine, secondLine, subline }) => {
  return (
    <div
      className={`
      container mx-auto text-left md:text-center flex flex-col justify-center py-12 lg:py-24
      ${styles.root}
    `}
    >
      <h1>
        {firstLine}
        <br />
        <strong className="text-secondary mt-3 block font-bold">
          {secondLine}
        </strong>
      </h1>
      <p className="md:max-w-md max-w-lg xl:max-w-2xl md:mx-auto opacity-50 mt-4 lg:mt-6 xl:mt-12 text">
        {subline}
      </p>
    </div>
  );
};
