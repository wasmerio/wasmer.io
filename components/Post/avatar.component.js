import React from 'react';
import { getImageUrl } from '../About/Team/components/Avatar/avatar.component';
import styles from './post.module.css';

export const AvatarComponent = ({ author }) => {

  return (
    <img
      className="w-12 h-12 rounded-full bg-lightgrey"
      src={getImageUrl(author.image)}
      alt={author.name}
    />
  );
};

export const AvatarWithNameComponent = ({ author }) => {
  return (
    <div className="flex items-center">
      <AvatarComponent author={author} />
      <div className="ml-4">
        <h4 className={styles.author}>{author.name}</h4>
        {/* <div className={styles.date}><DateFormatter dateString={date} /></div> */}
      </div>
    </div>
  );
};
