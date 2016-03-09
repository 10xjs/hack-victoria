import compose from 'lodash/flowRight';

import base from './partial/base.webpack.config';

const createConfig = compose(
  base({name: 'server', output: 'build/server'})
);

// Extend the default webpack configuration with any partials you want.
export default createConfig({
  target: 'node',
});
