import React from 'react';

export const QuoteComponent = ({ text, author, variant }) => {
  const color = variant || 'primary';
  return (
    <blockquote
      className={`bg-${color} text-white my-page py-page
      text-left md:text-center mx-auto`}
    >
      <div className="container">
        <p className="text-xl md:w-6/12 mx-auto">“{text}”</p>
        <cite className="text-small not-italic block mt-2 lg:mt-3 xl:mt-4">
          {author}
        </cite>
      </div>
    </blockquote>
  );
};
