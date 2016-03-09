import {createElement, Component, PropTypes} from 'react';
import {RouterContext} from 'react-router';

import NotFound from 'component/not-found';
import BaseRoot from './root';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    renderProps: PropTypes.object,
  };

  render() {
    const {store, renderProps} = this.props;
    return (
      <BaseRoot store={store}>
        {renderProps ? <RouterContext {...renderProps}/> : <NotFound/>}
      </BaseRoot>
    );
  }
}
