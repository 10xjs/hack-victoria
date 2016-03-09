import values from 'lodash/values';
import {createElement, Component} from 'react';
import {Link} from 'react-router';

import DocumentTitle from 'component/document-title';

export default class Film extends Component {
  constructor(props, context) {
    super(props, context);

    const {films, getFilms} = this.props;

    if (!values(films).length) {
      getFilms();
    }
  }

  render() {
    const {film} = this.props;

    if (!film) {
      return <div>Loading</div>;
    }

    const {
      title,
      episodeId,
      openingCrawl,
      director,
      releaseDate,
    } = film;

    return (
      <DocumentTitle title={title}>
        <div>
          <div>
            <h1>{`Episode ${episodeId}: ${title}`}</h1>
            <p>{`Released ${releaseDate}`}</p>
            <p>{`Directed by ${director}`}</p>
            <h3>{openingCrawl}</h3>
          </div>
          <Link to='/'>Back to films index</Link>
        </div>
      </DocumentTitle>
    );
  }
}
