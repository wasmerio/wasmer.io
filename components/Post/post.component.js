import React from 'react';

import { urlFor } from '../../utils/sanity.util';
import { DateFormatter } from '../Date';
import styles from './post.module.css';

export const PostComponent = ({ title, children, author, date }) => {
  return (
    <>
      <div className="container">
        <div className="flex items-center justify-center">
          <article className={`${styles.root} mt-8 mb-24`}>
            <h1 className={`${styles.title} mb-4`}>{title}</h1>
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full bg-lightgrey"
                src={urlFor(author.image)}
                alt={author.name}
              />
              <div className="ml-4">
                <h4 className={styles.author}>{author.name}</h4>
                <div className={styles.date}>
                  <DateFormatter dateString={date} />
                </div>
              </div>
            </div>
            <div className="prose mt-4">{children}</div>
          </article>
        </div>
      </div>
    </>
  );
};
