import React from 'react';


export const PressComponent = ({ title, children }) => {
  return (
    <>
      <div className="container">
        <div className="lg:flex items-center justify-center">
          <article className="prose">
            <h1>{title}</h1>
            {children}
          </article>
        </div>
      </div>
    </>
  );
}
