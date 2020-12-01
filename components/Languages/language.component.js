import React from 'react';
import styles from './language.module.css';

export const LanguageComponent = ({
  link,
  icon,
  highlighted,
  large,
  className,
}) => {
  const iconMarkup = (
    <div className="absolute top-0 left-0 w-full h-full lg:p-1">{icon}</div>
  );

  if (!link) {
    return (
      <div
        className={`
          grid-box extended relative h-dot-2 lg:h-dot-3 w-dot-2 lg:w-dot-3
          ${styles.root}
          ${highlighted ? styles.highlighted : ''}
          ${large ? 'h-dot-3 lg:h-dot-4 w-dot-3 lg:w-dot-4' : ''}
          ${className}
        `}
      >
        {icon && iconMarkup}
      </div>
    );
  }
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={`
        grid-box extended text-white relative h-dot-2 lg:h-dot-3 w-dot-2 lg:w-dot-3
        ${styles.root}
        ${styles.interactive}
        ${highlighted ? styles.highlighted : ''}
        ${large ? 'h-dot-3 lg:h-dot-4 w-dot-3 lg:w-dot-4' : ''}
        ${className}
      `}
    >
      {icon && iconMarkup}
    </a>
  );
};
