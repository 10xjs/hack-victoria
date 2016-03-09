import {connect} from 'react-redux';

import {filmsSelector} from 'selector/films.selector';

import {getFilms} from 'action/swapi.api.action';

import Index from './index.handler';

const mapState = (state) => ({
  films: filmsSelector(state),
});

const mapDispatch = (dispatch) => ({
  getFilms: () => dispatch(getFilms()),
});

export default connect(mapState, mapDispatch)(Index);
