import createStore from 'store/store';

import {setLocale} from 'action/intl.action';

export default (req) => {
  const store = createStore();
  store.dispatch(setLocale(req.locale));
  return store;
};
