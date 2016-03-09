import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import {routeReducer} from 'react-router-redux';

import intl from './intl';
import films from './films.reducer';

export default combineReducers({
  routing: routeReducer,
  form,
  intl,
  films,
});
