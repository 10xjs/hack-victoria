import {createAction} from 'redux-actions';
import {createActionRequest} from 'util/request.util';

import {
  API_GET_FILMS,
  API_GET_FILM,
  API_GET_PEOPLE,
  API_GET_PERSON,
} from 'action/types';

export const getFilms = createAction(
  API_GET_FILMS,
  () => createActionRequest({url: `${__API_URL__}films/`})
);

export const getFilm = createAction(
  API_GET_FILM,
  (id) => createActionRequest({url: `${__API_URL__}films/${id}/`})
);

export const getPeople = createAction(
  API_GET_PEOPLE,
  () => createActionRequest({url: `${__API_URL__}people/`})
);

export const getPerson = createAction(
  API_GET_PERSON,
  (id) => createActionRequest({url: `${__API_URL__}people/${id}/`})
);
