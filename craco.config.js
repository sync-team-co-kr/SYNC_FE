const path = require('path');
const CracoAlias = require('craco-alias');
require('dotenv').config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

module.exports = {
  // devServer: {
  //   https: {
  //     key: path.resolve(__dirname, 'localhost-key.pem'),
  //     cert: path.resolve(__dirname, 'localhost.pem'),
  //   },
  // },
  webpack: {
    alias: {
      '@config': path.resolve(__dirname, 'src/config'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@customTypes': path.resolve(__dirname, 'src/customTypes'),
      '@token': path.resolve(__dirname, 'src/token'),
    },
  },

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
        debug: false,
      },
    },
  ],
};
