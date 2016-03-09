import createStore from 'store';

import render from './render';
import getState from './get-state';
import createDevTools from './dev-tools.js';

const store = createStore(getState());

createDevTools(store);
render(store);
