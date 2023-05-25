import React from 'react';
import styles from './contact.module.css';

export const ContactComponent = ({ title, children }) => {
  return (
    <div className="container sm:text-left md:text-center mx-auto my-page">
      <h2 className="mdw-2/4 mx-auto mb-8 md:mb-10 lg:mb-12 xl:mb-14">
        {title}
      </h2>
      <div className={`${styles.buttons} flex md:justify-center`}>
        {children}
      </div>
    </div>
  );
};
