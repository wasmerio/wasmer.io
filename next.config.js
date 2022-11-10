const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'public/images'),
  webpack(config, options) {
    return config;
  },
  // experimental: {
  //   runtime: 'experimental-edge',
  // },
  env: {
    GITHUB_API_ACTIVE: process.env.GITHUB_API_ACTIVE ? process.env.GITHUB_API_ACTIVE : false,
  }
});



// const nextConfig = {
//     experimental: {
//       runtime: 'experimental-edge',
//     },
//     reactStrictMode: true,
//     swcMinify: true,
//     env: {
//       GITHUB_API_ACTIVE: process.env.GITHUB_API_ACTIVE ? process.env.GITHUB_API_ACTIVE : false,
//     }
//   }
  
//   module.exports = nextConfig
