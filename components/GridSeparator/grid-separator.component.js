import React from 'react';
import { ColorDots } from '../ColorDots/color-dots.component';

export const GridSeparatorComponent = () => {
  return (
    <div className="dot-background relative h-20 ml-3 md:ml-0">
      <ColorDots items={150} />
    </div>
  );
};
