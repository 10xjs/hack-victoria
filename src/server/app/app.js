import compose from 'lodash/flowRight';

import base from 'http-middleware-metalab/base';
import assets from 'http-middleware-metalab/middleware/assets';
import empty from 'http-middleware-metalab/middleware/empty';
import send from 'http-middleware-metalab/middleware/send';
import header from 'http-middleware-metalab/middleware/header';
import status from 'http-middleware-metalab/middleware/status';

import devAssets from 'webpack-udev-server/runtime/dev-assets';

import error from 'server/middleware/error.middleware';
import * as client from 'server/middleware/client.middleware';

import createStore from './store';
import createRoutes from './routes';
import renderRoot from './render';
import getPageElement from './page';
import getStatus from './status';

const ASSET_STATS = './build/client/stats.json';

export default compose(
  base({
    locales: ['en-US'],
  }),

  // Serve webpack assets.
  process.env.IPC_URL ? devAssets(ASSET_STATS) : assets(ASSET_STATS),

  client.store(createStore),
  client.router(createRoutes),
  client.routerRedirect(),
  client.render(renderRoot, {maxIterations: 2}),
  client.page(getPageElement),
  header('Content-Type', 'text/html; charset=utf-8'),
  status(getStatus),
  send(),

  error(),

  empty,
);
