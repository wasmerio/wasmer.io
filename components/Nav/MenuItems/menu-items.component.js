import React from 'react';
import Link from 'next/link';

export const MenuItemsComponent = ({ links, mobile, onClick }) => {
  return (
    <>
      {links.map(({ href, label, external }) => (
        <li
          key={`${href}-${label}`}
          className={`
            ${mobile ? '-mt-3' : 'py-2'}
            hover:opacity-75 transition transition-opacity duration-200
          `}
        >
          <Link href={href}>
            <a
              className={`${
                mobile ? 'py-4 w-full block text-white text-base' : ''
              } no-underline`}
              target={external && '_blank'}
              onClick={onClick}
              rel={external && 'noopener noreferrer'}
            >
              {label}
            </a>
          </Link>
        </li>
      ))}
    </>
  );
};
