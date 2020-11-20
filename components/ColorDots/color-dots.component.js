import React, { useState, useEffect } from 'react';
import { getScreenType } from '../../utils';

/**
 * @param items {number}
 * @param distance {number[]} Distance on the grid, default values are for grid 25x25 dots
 * @param variant {boolean|string} If true, set dots to the center and move by calculated offset
 * @returns {*}
 * @constructor
 */
export const ColorDots = ({
  items = 25,
  distance = [1, 25],
  variant = false,
}) => {
  /**
   * Default value for grid size
   *
   * @type {number}
   */
  const gridSize = 28;

  /**
   * Defines how big should be a group of same color dots
   * it takes min and max values
   *
   * type {number[]}
   */
  const changeColorEvery = [1, 2];

  /**
   * How far each dots in the group should be placed
   * takes min and max value
   *
   * @type {number[]}
   */
  const groupOffset = [1, 2];

  /**
   * Defines liters of colors, colors has to be defined in assets/index.css as: .fill-{color}
   *
   * @type {string[]}
   */
  const colors = ['red', 'green', 'yellow'];

  /**
   * Object of properties reused on group iterations
   *
   * @type {{top: number, color: string, left: number, iteration: number}}
   */
  const last = {
    top: distance[0],
    left: distance[0],
    color: colors[0],
    iteration: 1,
  };

  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const type = getScreenType(window);
    setScreen(type);
  });

  /**
   * Return random value from given range
   *
   * @param range {number[]}
   * @returns {number}
   */
  const getRandomFromRange = (range) => {
    const min = range[0];
    const max = range[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Get number of same colored dots in group
   *
   * @returns {number}
   */
  const getRandomColorIterationsCount = () => {
    return getRandomFromRange(changeColorEvery);
  };

  /**
   * Get random color from defined list
   *
   * @returns {string}
   */
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  /**
   * Get random position on the grid
   *
   * @returns {number}
   */
  const getRandomPosition = () => {
    const random = getRandomFromRange(distance);
    return random * gridSize;
  };

  /**
   * Get offset of dots in same colored group
   *
   * @param value {number}
   * @returns {number}
   */
  const applyOffset = (value) => {
    const offset = getRandomFromRange(groupOffset);
    return offset * gridSize + value;
  };

  /**
   * Randomly place colored dots by grouping them in to same color groups
   *
   * @returns {*[]}
   */
  const randomize = () => {
    return Array.from({ length: items }, (element, index) => {
      if (!(index % last.iteration)) {
        last.top = getRandomPosition();
        last.left = getRandomPosition();
        last.color = getRandomColor();
        last.iteration = getRandomColorIterationsCount();
      } else {
        last.top = applyOffset(last.top);
        last.left = applyOffset(last.left);
      }
      let position = `${last.left}px ${last.top}px`;

      if (variant === 'footer') {
        position =
          ['xs', 'sm'].indexOf(screen) !== -1
            ? `calc(100% ${index % 2 ? '+' : '-'} ${
                last.left
              }px) calc(0.25rem + ${last.top}px)`
            : `calc(50% ${index % 2 ? '+' : '-'} ${
                last.left
              }px) calc(0.25rem + ${last.top}px)`;
      }

      if (['center-left'].indexOf(variant) !== -1) {
        if (['xs', 'sm'].indexOf(screen) !== -1) {
          position = `calc(12px + ${last.left}px) ${last.top}px`;
        }
        if (['md'].indexOf(screen) !== -1) {
          position = `calc(50% ${index % 2 ? '+' : '-'} ${last.left}px) ${
            last.top
          }px`;
        }
      }

      if (variant === 'center') {
        if (['md'].indexOf(screen) !== -1) {
          position = `calc(50% ${index % 2 ? '+' : '-'} ${last.left}px) ${
            last.top
          }px`;
        }
      }

      if (variant === 'right') {
        if (['xs', 'sm'].indexOf(screen) !== -1) {
          position = `calc(${last.left}px) ${last.top}px`;
        }
        if (['xs', 'sm'].indexOf(screen) === -1) {
          position = `calc(100% ${index % 2 ? '+' : '-'} ${
            last.left
          }px) ${last.top}px`;
        }
      }

      if (variant === 'right-m12') {
        if (['xs', 'sm'].indexOf(screen) !== -1) {
          position = `calc(12px + ${last.left}px) ${last.top}px`;
        }
        if (['xs', 'sm'].indexOf(screen) === -1) {
          position = `calc(100% ${index % 2 ? '+' : '-'} ${
            last.left
          }px) ${last.top}px`;
        }
      }

      if (variant === 'm12') {
        if (['xs', 'sm'].indexOf(screen) !== -1) {
          position = `calc(12px + ${last.left}px) ${last.top}px`;
        }
      }

      if (variant === 'm24') {
        if (['xs', 'sm'].indexOf(screen) !== -1) {
          position = `calc(4px + ${last.left}px) calc(2px + ${last.top}px)`;
        }
        if (['xs', 'sm'].indexOf(screen) === -1) {
          position = `calc(50% + 4px ${index % 2 ? '+' : '-'} ${last.left}px)
         calc(2px + ${last.top}px)`;
        }
      }

      return `url(/images/dots/${last.color}.svg) no-repeat ${position} / ${gridSize}px ${gridSize}px`;
    });
  };

  return (
    <div
      className="absolute overflow-hidden w-full h-full "
      style={{ background: randomize() }}
    />
  );
};
