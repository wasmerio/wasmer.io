import React from 'react';
import styles from './card.module.css';
import { LinkComponent } from '../Link/link.component';

export const CardComponent = ({
  text,
  link,
  icon,
  className,
  small,
  horizontal,
  secondary,
  lightgrey,
  target,
}) => {
  if (!link) {
    return (
      <div
        className={`
          bg-secondary rounded shadow-lightpurple text-white flex flex-col justify-end relative font-bold text-left
          ${styles.root}
          ${!link ? styles.nonInteractive : ''}
          ${secondary ? styles.secondary : ''}
          ${lightgrey ? styles.lightgrey : ''}
          ${horizontal ? styles.horizontal : ''}
          ${small ? styles.small : ''}
          ${className}
        `}
      >
        <img className={`${styles.icon}`} src={icon} role="presentation" />
        <div className={styles.content}>
          {small ? (
            <h3 className="font-bold">{text}</h3>
          ) : (
            <h2 className="font-bold">{text}</h2>
          )}
        </div>
      </div>
    )
  }

  return (
    <a
      href={link}
      target={target}
      className={`
        bg-secondary rounded shadow-lightpurple text-white flex flex-col justify-end relative font-bold text-left
        ${styles.root}
        ${secondary ? styles.secondary : ''}
        ${lightgrey ? styles.lightgrey : ''}
        ${horizontal ? styles.horizontal : ''}
        ${small ? styles.small : ''}
        ${className}
      `}
    >
      <img className={`${styles.icon}`} src={icon} role="presentation" />
      <div className={styles.content}>
        {small ? (
          <h3 className="font-bold">{text}</h3>
        ) : (
          <h2 className="font-bold">{text}</h2>
        )}

        <LinkComponent
          inverted={!lightgrey}
          small={small}
          nonInteractive
          linkText="Learn more"
          className="link"
        />
      </div>
    </a>
  );
};
