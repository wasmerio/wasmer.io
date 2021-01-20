import React from 'react';
import styles from './post.module.css';
import { getImageUrl } from '../About/Team/components/Avatar/avatar.component';
import { DateFormatter } from '../Date';

export const PostComponent = ({ title, children, author, date }) => {
  return (
    <>
      <div className="container">
        <div className="flex items-center justify-center">
          <article className={`${styles.root} mt-8`}>
            <h1 className={`${styles.title} mb-4`}>{title}</h1>
            <div className="flex items-center">
              <img className="w-12 h-12 rounded-full bg-lightgrey" src={getImageUrl(author.image)} alt={author.name} />
              <div className="ml-4">
                <h4 className={styles.author}>{author.name}</h4>
                <div className={styles.date}><DateFormatter dateString={date} /></div>
                </div>
              </div>
            <div class="prose mt-4">{children}</div>
          </article>
        </div>
      </div>
    </>
  );
}
