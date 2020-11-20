import React from 'react';
import { SnippetComponent } from '../..';
import links from '../../Languages/languages-hero.constants';
import { HeaderComponent } from './components';
import styles from './hero.module.css';
import {ColorDots} from "../../ColorDots/color-dots.component";

export const HeroComponent = () => {
  return (
    <div className={styles.hero}>
      <div></div>
      <div className="container">
        <HeaderComponent />
      </div>
      <div className={styles.grid}>
        <div className={styles.container}>
          <SnippetComponent variant="dark" />
          <div
            className={`bg-white relative text-opacity-50 text-xs text-primary md:px-3 mt-4 ${styles.languagesContainer}`}
          >
            <div className="flex flex-col md:flex-row">
              <div className="mr-2 font-medium self-center flex-auto">
                or just embed it into your existing application:
              </div>
              <div className="flex-auto flex justify-around mt-2 md:mt-0 md:justify-center mx-10 md:mx-0">
                {links.map(({ name, url, icon }) => (
                  <div
                    key={`${url}-${name}`}
                    className="flex-auto self-center mx-1"
                  >
                    <a href={url} target="_blank" className={`${styles.item}`}>
                      <img className={styles.icon} src={icon.image} />
                      <img
                        className={styles.iconAlternative}
                        src={icon.alternative}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
