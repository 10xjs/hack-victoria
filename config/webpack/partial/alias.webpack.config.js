import partial from 'webpack-partial';

export default (config) => partial(config, {
  resolve: {
    alias: {
      // 'babel-runtime/core-js/promise': require.resolve('bluebird'),
    },
  },
});
