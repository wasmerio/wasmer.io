import React from 'react';
import Link from 'next/link';
import GithubIcon from '../../../../../../../public/images/github.svg';

export const GithubComponent = ({ handler }) => {
  return (
    <>
      <Link href={`https://github.com/${handler}`}>
        <a className="no-underline" target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </a>
      </Link>
    </>
  );
};
