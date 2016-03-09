import compose from 'lodash/flowRight';
import {applyMiddleware} from 'redux';
import {syncHistory} from 'react-router-redux';
import browserHistory from 'react-router/lib/browserHistory';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';

import assign from './assign.enhancer';

export const createRouterHistory = () => {
  if (__CLIENT__) {
    return browserHistory;
  }

  if (__SERVER__) {
    return createMemoryHistory();
  }
};

export default () => (createStore) => (reducer, initialState) => {
  const routerHistory = createRouterHistory();
  const routerMiddleware = syncHistory(routerHistory);

  const enhance = compose(
    applyMiddleware(routerMiddleware),
    assign({routerHistory}),
  );

  const store = enhance(createStore)(reducer, initialState);

  if (__DEVELOPMENT__) {
    routerMiddleware.listenForReplays(store);
  }

  return store;
};
