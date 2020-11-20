import React from 'react';
import { ColorDots } from '../ColorDots/color-dots.component';
import { MenuItemsComponent } from '../Nav/MenuItems/menu-items.component';
import links from './footer.constants';
import styles from './footer.module.css';

export const FooterComponent = () => {
  return (
    <footer
      className={`dot-background on-dark text-white bg-primary relative font-semibold ${styles.footer}`}
    >
      <ColorDots variant="footer" />
      <div className="container flex flex-col-reverse items-end md:flex-row justify-between pb-3">
        <div
          className={`bg-primary py-10 lg:py-7 -mr-8 md:mr-0 md:-ml-8 lg:ml-0 px-10 lg:px-8 md:mb-6 lg:mb-10 z-10 ${styles.company}`}
        >
          <img src="images/logo-white.svg" className={styles.logo} />
          <p className="pt-3 text-small font-semibold">
            Making software universally accessible
          </p>
          <div className={`${styles.copyright} md:hidden block mt-6`}>
            © 2019 Wasmer, Inc.
          </div>
        </div>
        <div
          className={`py-8 md:py-10 lg:py-12 pl-10 md:pl-12 lg:pl-16 -mr-8 lg:mr-0 pr-14 bg-primary z-10 ${styles.nav}`}
        >
          <ul className="text-small relative list-none p-0">
            <MenuItemsComponent links={links} />
            <li className={`${styles.iconLink} ${styles.github}`}>
              <a
                href="https://github.com/wasmerio/wasmer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>
            <li className={`${styles.iconLink} ${styles.twitter}`}>
              <a
                href="https://twitter.com/wasmerio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li className={`${styles.iconLink} ${styles.slack}`}>
              <a
                href="https://slack.wasmer.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slack
              </a>
            </li>
          </ul>
          <div className={`${styles.copyright} hidden md:block mt-14`}>
            © 2019 Wasmer, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};
