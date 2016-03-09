import {renderToStaticMarkup} from 'react-dom/server';
import createWait from 'redux-promise-wait/create-wait';
import {match} from 'react-router';

export const store = (createStore) => (app) => ({
  ...app,
  request: (req, res) => {
    return Promise.resolve(req)
      .then(createStore)
      .then((store) => {
        const {clientContext = {}} = req;
        clientContext.store = store;
        req.clientContext = clientContext;
      })
      .then(() => app.request(req, res))
      .catch((err) => app.error(err, req, res));
  },
});

export const router = (getRoutes) => (app) => {
  return {
    ...app,
    request: (req, res) => {
      const {clientContext} = req;

      if (process.env.NODE_ENV !== 'production') {
        if (!clientContext) {
          return app.error(new Error(
            'Client Router Middleware: ' +
            'A client context must be created first. Ensure that ' +
            '`client.store` middleware is implemented correctly.'
          ));
        }
      }

      clientContext.router = {};

      match({
        routes: getRoutes(req),
        history: clientContext.store.routerHistory,
        location: req.url,
      }, (err, redirectLocation, renderProps) => {
        if (err) {
          return app.error(err, req, res);
        }
        const notFound = !redirectLocation && !renderProps;
        clientContext.router = {
          redirectLocation,
          renderProps,
          notFound,
        };
        return app.request(req, res);
      });
    },
  };
};

export const routerRedirect = () => (app) => {
  const HTTP_FOUND = 302;

  return {
    ...app,
    request(req, res) {
      const {redirectLocation} = req.clientContext.router;

      if (redirectLocation) {
        const {pathname, search} = redirectLocation;

        res.statusCode = HTTP_FOUND;
        res.setHeader('Location', pathname + search);

        return res.end();
      }

      return app.request(req, res);
    },
  };
};

export const render = (createRender, waitConfig = {}) => (app) => {
  return {
    ...app,
    request: (req, res) => {
      const {clientContext} = req;

      if (process.env.NODE_ENV !== 'production') {
        if (!clientContext) {
          return app.error(new Error(
            'Client Render Middleware: ' +
            'A client context must be created first. Ensure that ' +
            '`client.context` middleware is implemented correctly.'
          ));
        }
      }

      const {store} = clientContext;

      if (process.env.NODE_ENV !== 'production') {
        if (!store) {
          return app.error(new Error(
            'Client Render Middleware: ' +
            'The client context must include a Redux `store` property.'
          ));
        }
      }

      const waitStoreName = waitConfig.storeName || 'waitStore';

      const waitStore = store[waitStoreName];

      if (process.env.NODE_ENV !== 'production') {
        if (!waitStore) {
          return app.error(new Error(
            'Client Render Middleware: ' +
            'The client context Redux \`store\` does not have a ' +
            `\`${waitStoreName}\` property. Ensure that the Redux store is ` +
            'enhanced with `redux-promise-wait/enhancer` and that the ' +
            '`storeName` config option does not differ.'
          ));
        }
      }

      const render = createRender(req);
      const renderWait = createWait(render, store, waitConfig);

      return renderWait()
        .then((result) => {
          clientContext.render = {
            result,
            stats: waitStore.getState().stats,
          };
        })
        .then(() => app.request(req, res))
        .catch((err) => app.error(err, req, res));
    },
  };
};

export const page = (getPageElement) => (app) => {
  return {
    ...app,
    request(req, res) {
      Promise.resolve(req)
        .then(getPageElement)
        .then(renderToStaticMarkup)
        .then((markup) => {
          req.body = `<!DOCTYPE html>${markup}`;
          return app.request(req, res);
        })
        .catch((err) => app.error(err, req, res));
    },
  };
};
