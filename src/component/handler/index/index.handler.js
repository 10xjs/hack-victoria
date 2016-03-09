import kebabCase from 'lodash/kebabCase';
import values from 'lodash/values';
import {createElement, Component} from 'react';
import {Link} from 'react-router';

import DocumentTitle from 'component/document-title';

export default class Index extends Component {
  constructor(props, context) {
    super(props, context);

    const {films, getFilms} = this.props;

    if (!values(films).length) {
      getFilms();
    }
  }

  render() {
    const {films} = this.props;

    return (
      <DocumentTitle title='Star Wars Films'>
        <div>
          <h1>Star Wars Films</h1>
          {values(films).map(({episodeId, title}) => (
            <div key={episodeId}>
              <Link to={`/film/${kebabCase(title)}`}>
                {`Episode ${episodeId}: ${title}`}
              </Link>
            </div>
          ))}
        </div>
      </DocumentTitle>
    );
  }
}
