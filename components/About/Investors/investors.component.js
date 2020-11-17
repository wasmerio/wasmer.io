import React from 'react';
import Link from 'next/link';
import investors from './investors.constants';

export const InvestorsComponent = () => {
  return (
    <div className="my-24">
      <div className="container">
        <h1 className="font-bold text-left md:text-center mb-12">
          ...and the investors.
        </h1>
        <div className="flex flex-row justify-around items-center">
          {investors.map(({ name, href, image }, index) => (
            <Link href={href} key={index}>
              <a
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="w-4/5 md:w-full"
                  src={`images/investors/${image}`}
                  alt={name}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
