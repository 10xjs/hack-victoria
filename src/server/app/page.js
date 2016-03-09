import {createElement} from 'react';
import escape from 'htmlescape';

import Page from 'component/page';

import {localeSelector} from 'selector/intl.selector';
import {pathnameSelector} from 'selector/routing.selector';

export const CSS_FILE = /\.css$/;
export const JS_FILE = /\.js$/;

export const assetFilter = (regExp) => ({name}) => regExp.test(name);

export const parseRenderStats = (stats) => {
  return {
    iterations: stats.length,
    duration: stats.reduce((reduced, render) => {
      return reduced + render.duration;
    }, 0),
    actions: stats.reduce((reduced, render) => {
      return reduced.concat(render.results.map((result) => {
        return result.action.type;
      }));
    }, []),
  };
};

export const getScripts = (state, req) => {
  const {assets} = req;

  const scripts = assets.filter(assetFilter(JS_FILE));

  scripts.unshift({
    id: 'state',
    type: 'text/json',
    content: escape(state),
  });

  if (__DEVELOPMENT__) {
    const {stats} = req.clientContext.store.waitStore.getState();
    scripts.unshift({
      id: 'log-render-stats',
      type: 'text/javascript',
      content: `
console.log(
  'Render Stats',
  (function () {
    try {
      var element = document.getElementById('render-stats');
      return element
        ? JSON.parse(element.textContent || element.innerText || '{}')
        : { };
    } catch (e) {
      return e;
    }
  })()
);`,
    });
    scripts.unshift({
      id: 'render-stats',
      type: 'text/json',
      content: escape(parseRenderStats(stats)),
    });
  }

  return scripts;
};

export const getStyles = (state, req) => {
  const {assets} = req;
  return assets.filter(assetFilter(CSS_FILE));
};

export const getMeta = () => [
  {charSet: 'utf-8'},
  {httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1'},
  {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1.0, maximum-scale=1',
  },
  {name: 'apple-mobile-web-app-capable', content: 'yes'},
];

export default (req) => {
  const {
    clientContext: {
      store,
      render: {
        result: {
          markup,
          title,
        },
      },
    },
  } = req;

  const state = store.getState();

  const props = {
    markup,
    title,
    meta: getMeta(state, req),
    scripts: getScripts(state, req),
    styles: getStyles(state, req),
    path: pathnameSelector(state),
    locale: localeSelector(state),
  };

  return <Page {...props}/>;
};
