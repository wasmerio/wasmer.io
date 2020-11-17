import React from 'react';

export const HeaderComponent = () => {
  return (
    <>
      <h1 className="text-left sm:text-center">
        <strong className="text-secondary mb-5 sm:mb-0 font-bold block">
          Run any code <br className="block sm:hidden" /> on any client.
        </strong>
        With WebAssembly <br className="block sm:hidden" /> and Wasmer.
      </h1>
    </>
  );
};
