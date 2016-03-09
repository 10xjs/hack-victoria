import identity from 'lodash/identity';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import {persistState} from 'redux-devtools';

import reducer from 'reducer';

import DevTools from 'component/dev-tools';
import waitEnhancer from 'redux-promise-wait/enhancer';

import routerEnhancer from './router.enhancer.js';

export default (initialState) => {
  return compose(
    applyMiddleware(thunkMiddleware),
    __SERVER__ && waitEnhancer() || identity,
    applyMiddleware(promiseMiddleware),
    routerEnhancer(),
    __DEVELOPMENT__ && DevTools.instrument() || identity,
    __DEVELOPMENT__ && persistState() || identity,
  )(createStore)(reducer, initialState);
};
