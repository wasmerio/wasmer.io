import React from 'react';
import { GithubBadge } from '../../GithubBadge/github-badge.component';
import { MenuItemsComponent } from '../MenuItems/menu-items.component';
import styles from './mobile-menu.module.css';

export const MobileMenu = ({ links, toggleMenu }) => {
  return (
    <div
      className={`fixed inset-0 block w-screen h-screen bg-none ${styles.root}`}
      onClick={toggleMenu}
    >
      <div className={styles.mobileMenu}>
        <button
          onClick={toggleMenu}
          className="absolute top-0 right-0 z-50 p-8"
          aria-label="Mobile menu opener"
        >
          <img src="/images/close_menu.svg" />
        </button>
        <div className="h-full flex flex-col justify-between">
          <ul>
            <MenuItemsComponent mobile links={links} onClick={toggleMenu} />
            <li className={styles.twitter}>
              <a
                href="https://twitter.com/wasmerio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <GithubBadge colored />
          </ul>
          <div className="flex flex-col">
            <span className={`${styles.subtitle} text-white font-medium`}>
              Making software universally accessible
            </span>
            <span className="text-white opacity-50 font-semibold text-sm block mt-6">
              &copy; 2020 Wasmer, Inc.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
