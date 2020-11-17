export const SCREEN_TYPE_XS = 'sm';
export const SCREEN_TYPE_SM = 'sm';
export const SCREEN_TYPE_MD = 'md';
export const SCREEN_TYPE_LG = 'lg';
export const SCREEN_TYPE_XL = 'xl';

/** Returns viewport resolution */
export const getWindowDimensions = (window) => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const getScreenType = (window) => {
  const { width } = getWindowDimensions(window);
  let type = SCREEN_TYPE_XS;

  if (568 <= width && width < 650) {
    type = SCREEN_TYPE_SM;
  }

  if (650 <= width && width < 1024) {
    type = SCREEN_TYPE_MD;
  }

  if (1024 <= width && width < 1800) {
    type = SCREEN_TYPE_LG;
  }

  if (width >= 1800) {
    type = SCREEN_TYPE_XL;
  }

  return type;
};
