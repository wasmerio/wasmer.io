import Link from 'next/link';
import React from 'react';
import Chevron from '../../public/images/chevron.svg';
import styles from './link.module.css';

export const LinkComponent = ({
  isButton,
  secondary,
  inverted,
  grey,
  linkText,
  href,
  target,
  rel,
  nonInteractive,
  small,
  className,
}) => {
  if (nonInteractive) {
    return (
      <p
        className={`
          ${styles.root}
          ${inverted ? styles.inverted : ''}
          ${small ? styles.small : ''}
          ${styles.nonInteractive}
          ${className}
        `}
      >
        <Chevron />
        {linkText}
      </p>
    );
  }
  return (
    <Link href="/">
      <a
        href={href}
        target={target}
        rel={rel}
        className={`
          ${styles.root}
          ${isButton ? styles.isButton : ''}
          ${secondary ? styles.secondary : ''}
          ${grey ? styles.grey : ''}
          ${inverted ? styles.inverted : ''}
          ${className}
        `}
      >
        <Chevron />
        {linkText}
      </a>
    </Link>
  );
};
