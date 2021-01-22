import React from 'react';
import { SnippetComponent } from '../..';
import links from '../../Languages/languages-hero.constants';
import { HeaderComponent } from './components';
import styles from './hero.module.css';
import { ColorDots } from '../../ColorDots/color-dots.component';

export const HeroComponent = () => {
  return (
    <div className={styles.hero}>
      <div />
      <div className="container">
        <HeaderComponent />
      </div>
      <div className={styles.grid}>
        <ColorDots items={90} variant="m24" />
        <div className={styles.container}>
          <SnippetComponent variant="dark" />
          <div
            className={`bg-white relative text-opacity-50 text-xs text-primary px-2 md:px-3 mt-4 ${styles.languagesContainer}`}
          >
            <div className="flex flex-col items-start md:flex-row">
              <div className="mr-2 font-medium md:self-center text-left md:text-center flex-auto">
                or just embed it into your existing application:
              </div>
              <div
                className={`${styles.languagesIcons} flex-auto flex justify-around mt-2 md:mt-0 md:justify-center md:mx-0`}
              >
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
