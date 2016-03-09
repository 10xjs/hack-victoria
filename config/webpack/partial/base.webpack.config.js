import compose from 'lodash/flowRight';
import identity from 'lodash/identity';

import optimize from 'webpack-config-optimize';
import devServer from 'webpack-config-dev-server';
import sourceMaps from 'webpack-config-source-maps';
import root from 'webpack-config-root';
import stats from 'webpack-config-stats';
import json from 'webpack-config-json';
import babel from 'webpack-config-babel';
import entry from 'webpack-config-entry';
import postcss from 'webpack-config-postcss';
import hot from 'webpack-config-hot';
import tap from 'webpack-config-tap';

import provide from './provide.webpack.config';
import define from './define.webpack.config';
import alias from './alias.webpack.config';

import ProgressPlugin from 'progress-bar-webpack-plugin';

export default ({name, output}) => compose(
  tap((config) => config.plugins.push(new ProgressPlugin())),
  provide,
  define,
  alias,
  process.env.NODE_ENV === 'production' ? optimize() : identity,
  postcss([]),
  process.env.NODE_ENV !== 'production' ? compose(
    devServer(),
    hot(),
  ) : identity,
  sourceMaps({}),
  root('src'),
  stats(),
  json(),
  babel(),
  entry({name, output}),
);
