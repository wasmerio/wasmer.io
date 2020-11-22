import React from 'react';

export const HeaderComponent = () => {
  return (
    <>
      <h1 className="text-left md:text-center py-8">
        <strong className="text-secondary mb-5 md:mb-0 font-bold block">
          Run any code <br className="block md:hidden" /> on any client.
        </strong>
        With WebAssembly <br className="block md:hidden" /> and Wasmer.
      </h1>
    </>
  );
};
