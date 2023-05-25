import Link from 'next/link';
import React from 'react';
import TwitterIcon from '../../../../../../../public/images/twitter.svg';

export const TwitterComponent = ({ handler }) => {
  return (
    <>
      <Link href={`https://twitter.com/${handler}`}>
        <a className="no-underline" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
      </Link>
    </>
  );
};
