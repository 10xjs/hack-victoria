import kebabCase from 'lodash/kebabCase';
import values from 'lodash/values';

export const filmsSelector = (state) => state.films;

export const filmSelector = (state, {title}) =>
  values(filmsSelector(state)).find((film) => kebabCase(film.title) === title);
