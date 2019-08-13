module.exports = {
    plugins: {
      "postcss-normalize": {},
      "postcss-global-import": {},
      "postcss-preset-env": {
        browsers: 'last 2 versions',
      },
      "postcss-custom-media": {
        // importFrom: "./components/media.css"
      },
      // "postcss-import": {
      //   filter: () => {
      //     // console.log(arguments);
      //     return false;
      //   }
      // }
      // "postcss-autoreset": {
      //   reset: {
      //     margin: 0,
      //     padding: 0,
      //     borderRadius: 0
      //   }
      // }
    }
  };
  