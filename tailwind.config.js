var dotSizes = {};

for (i = 2; i < 25; i++) {
  dotSizes[`dot-${i}`] = `calc(var(--spacing) * ${i-1} + var(--dot-size))`
}

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}'
    ],
    options: {
      whitelist: [
        'w-dot-1',
        'w-dot-2',
        'w-dot-3',
        'w-dot-4',
        'w-dot-5',
        'w-dot-6',
        'w-dot-7',
        'w-dot-8',
        'w-dot-9',
        'w-dot-10',
        'w-dot-11',
        'w-dot-12',
        'h-dot-1',
        'h-dot-2',
        'h-dot-3',
        'h-dot-4',
        'h-dot-5',
        'h-dot-6',
        'h-dot-7',
        'h-dot-8',
        'h-dot-9',
        'h-dot-10',
        'h-dot-11',
        'h-dot-12',
        'py-0',
        'py-1',
        'py-2',
        'py-3',
        'py-4',
        'py-5',
        'py-6',
        'py-7',
        'py-8',
        'py-9',
        'py-10',
        'py-11',
        'py-12',
      ]
    }
  },
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '650px',
      // => @media (min-width: 650px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1800px',
      // => @media (min-width: 1800px) { ... }
    },
    fontFamily: {
      sans: ['Gilroy'],
      mono: ['Zeitung Mono Pro', 'monospace']
    },
    lineHeight: {
      'none': 1,
      'tight': 1.2,
      'normal': 1.35
    },
    fontSize: {
      '2xl': 'var(--h1-size)',
      'xl': 'var(--h2-size)',
      'lg': 'var(--h3-size)',
      'base': 'var(--text-size)',
      'md': 'var(--text-size)',
      'sm': 'var(--smalltext-size)',
      'small': 'var(--smalltext-size)',
      'xs': 'var(--tinytext-size)',
      'boxtext': 'var(--boxtext-size)',
      'note': 'var(--tinytext-size)'
    },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%'
    },
    extend: {
      spacing: {
        '7': '1.75rem',
        '14': '3.5rem',
        '18': '4.5rem',
        '30': '7.5rem',
        'dot-size': 'var(--dot-size)',
        'dot-size2': 'calc(var(--dot-size) *2)',
        'dot-1': 'calc(var(--spacing) * 1 - var(--dot-size))',
        'dot-2': 'calc(var(--spacing) * 2 - var(--dot-size))',
        'dot-3': 'calc(var(--spacing) * 3 - var(--dot-size))',
        'dot-4': 'calc(var(--spacing) * 4 - var(--dot-size))',
        'dot-5': 'calc(var(--spacing) * 5 - var(--dot-size))',
        'dot-6': 'calc(var(--spacing) * 6 - var(--dot-size))',
        'spacer-1': 'var(--spacer-height)',
        'spacer-1/2': 'calc(var(--spacer-height) / 2)',
        'spacer-2/3': 'calc(var(--spacer-height) * .75)',
        'spacer-3/2': 'calc(var(--spacer-height) * 1.5)',
        'spacer-2': 'calc(var(--spacer-height) * 2)',
        'page': 'var(--page-spacing)',
        'page-1/2': 'var(--page-spacing-half)'
      },
      padding: {
        'dot-size': 'var(--dot-size)',
        'dot-size2': 'calc(var(--dot-size) *2)',
        'dot-1': 'calc(var(--spacing) * 1 + var(--dot-size))',
        'dot-2': 'calc(var(--spacing) * 2 + var(--dot-size))',
        'dot-3': 'calc(var(--spacing) * 3 + var(--dot-size))',
        'dot-4': 'calc(var(--spacing) * 4 + var(--dot-size))',
        'dot-5': 'calc(var(--spacing) * 5 + var(--dot-size))',
        'dot-6': 'calc(var(--spacing) * 6 + var(--dot-size))'
      },
      opacity: {
        '40': '0.4'
      },
      width: dotSizes,
      height: dotSizes,
      colors: {
        'primary': '#231044',
        'secondary': '#4946DD',
        'lightblue': '#7187FF',
        'red': '#EF476F',
        'green': '#02C39A',
        'yellow': '#F5BB00',
        'lightgrey': '#F0EEF2',
        'grey-10': '#E9E7EC',
        'grey-30': '#BDB7C7',
        'grey-60': '#7B708F'
      },
      boxShadow: {
        'darkpurple': '0px 3px 14px rgba(35, 16, 68, 0.2)',
        'lightpurple': '0px 3px 14px rgba(73, 70, 221, 0.3)',
      },
    },
    stroke: theme => ({
      'primary': theme('colors.primary'),
      'secondary': theme('colors.secondary'),
      'white': theme('colors.white')
    })
  },
  variants: {},
  plugins: [],
}
