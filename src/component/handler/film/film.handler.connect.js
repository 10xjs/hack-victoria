import {connect} from 'react-redux';

import {filmsSelector, filmSelector} from 'selector/films.selector';

import {getFilms} from 'action/swapi.api.action';

import Film from './film.handler';

const mapState = (state, {params: {title}}) => ({
  films: filmsSelector(state),
  film: filmSelector(state, {title}),
});

const mapDispatch = (dispatch) => ({
  getFilms: () => dispatch(getFilms()),
});

export default connect(mapState, mapDispatch)(Film);
