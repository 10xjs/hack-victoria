import camelCase from 'lodash/camelCase';
import isPlainObject from 'lodash/isPlainObject';
import {handleActions} from 'redux-actions';

import {
  API_GET_FILMS,
  API_GET_FILM,
} from 'action/types';

export const mapObjectKeys = (value, iteratee) => {
  if (Array.isArray(value)) {
    return value.map((arrayValue) => mapObjectKeys(arrayValue, iteratee));
  }

  if (isPlainObject(value)) {
    return Object.keys(value).reduce((reduced, key) => {
      reduced[iteratee(key)] = mapObjectKeys(value[key], iteratee);
      return reduced;
    }, {});
  }

  return value;
};

export const mergeFilms = (state, update) => {
  return {
    ...state,
    ...update.reduce((reduced, film) => {
      const camelCasedFilm = mapObjectKeys(film, camelCase);
      reduced[camelCasedFilm.episodeId] = camelCasedFilm;
      return reduced;
    }, {}),
  };
};

export const getFilms = (state, {payload, error}) => {
  if (error) {
    return state;
  }

  return mergeFilms(state, payload.results);
};

export const getFilm = (state, {payload, error}) => {
  if (error) {
    return state;
  }

  return mergeFilms(state, payload.results);
};

export default handleActions({
  [API_GET_FILMS]: getFilms,
  [API_GET_FILM]: getFilm,
}, {});
