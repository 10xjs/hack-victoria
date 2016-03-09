import webpack from 'webpack';
import partial from 'webpack-partial';

export default (config) => partial(config, {
  plugins: [
    new webpack.DefinePlugin({
      // App constants.
      __API_URL__: JSON.stringify(process.env.API_URL),

      // Target constants.
      __SERVER__: JSON.stringify(config.target === 'node'),
      __CLIENT__: JSON.stringify(config.target === 'web'),

      // NODE_ENV contants.
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEVELOPMENT__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      __PRODUCTION__: JSON.stringify(process.env.NODE_ENV === 'production'),
    }),
  ],
});
