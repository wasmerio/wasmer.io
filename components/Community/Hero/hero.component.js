import React from 'react';
import { HeaderComponent, HowToStartComponent } from './components';
import styles from './hero.module.css';

export const HeroComponent = () => {
  return (
    <div className="overflow-hidden">
      <div className="container lg:flex items-center pl-0">
        <div className="flex-grow md:px-14 lg:px-0 md:text-center">
          <HeaderComponent />
        </div>
        <div className={`${styles.gridContainer} -mx-8 md:-mx-16 lg:mx-0`}>
          <div className={`dot-background dot-grid ${styles.grid}`}></div>
          <HowToStartComponent />
        </div>
      </div>
    </div>
  );
};
