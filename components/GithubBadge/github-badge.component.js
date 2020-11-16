import React from 'react';
import { GithubCounterComponent } from '../../components';
import GithubLogoWhite from '../../public/images/github_white.svg';
import GithubLogo from '../../public/images/github-logo.svg';
import styles from './github-badge.module.css';

export const GithubBadge = ({ colored }) => {
  return (
    <li className={`${styles.github} ${colored ? styles.colored : ''}`}>
      <a
        href="https://github.com/wasmerio/wasmer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.githubAction}>
          {colored ? (
            <GithubLogoWhite width="20px" height="20px" />
          ) : (
            <GithubLogo width="20px" height="20px" />
          )}
          Star
        </span>
        <span className={styles.githubStars}>
          <GithubCounterComponent />
        </span>
      </a>
    </li>
  );
};
