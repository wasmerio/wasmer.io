import React from 'react';
import items from './trusted-by.constants';

export const TrustedByComponent = () => {
  return (
    <div className="container my-page-1/2 opacity-40">
      <ul className="-mr-6 -mb-4 md:-mb-8 md:mr-0 flex flex-row flex-wrap items-end justify-start md:justify-center">
        <li className="mb-4 md:mb-8 mr-6 md:mr-8 md:w-32 md:w-auto font-bold text-primary text-left md:text-center">
          Trusted by
        </li>
        {items.map(({ name, image, href }) => (
          <li key={`${href}-${name}`} className="mb-4 md:mb-8 mr-6 md:mr-8">
            <img className="h-6 md:h-7" src={image} alt={name} />
            {/* <Link href={href} >
              <a
                className="no-underline"
                target="_blank"
                rel="noopener noreferrer"
                title={name}
              >
                <img className="h-7" src={image} alt={name} />
              </a>
            </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};
