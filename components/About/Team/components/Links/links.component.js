import React from 'react';
import { GithubComponent, TwitterComponent } from './components/';
import styles from './links.module.css';

export const LinksComponent = ({ links }) => {
  return (
    <>
      <ul className={`${styles.container} mt-6`}>
        {links.map(({ medium, handler }, index) => (
          <li key={index}>
            {medium === 'twitter' && <TwitterComponent handler={handler} />}
            {medium === 'github' && <GithubComponent handler={handler} />}
          </li>
        ))}
      </ul>
    </>
  );
};
