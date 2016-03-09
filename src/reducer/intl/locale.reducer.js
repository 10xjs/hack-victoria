import {handleActions} from 'redux-actions';

import {SET_LOCALE} from 'action/types';

export const setLocale = (state, {payload}) => payload;

export default handleActions({
  [SET_LOCALE]: setLocale,
}, null);
