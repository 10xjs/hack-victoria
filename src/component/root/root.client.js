import {createElement, Component, PropTypes} from 'react';
import {Router, Route} from 'react-router';

import NotFound from 'component/not-found';
import createRoutes from 'route';
import BaseRoot from './root';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    const {store} = this.props;
    const {routerHistory} = store;

    const notFoundRoute = <Route key='notFound' path='*' component={NotFound}/>;
    return (
      <BaseRoot store={store}>
        <Router history={routerHistory}>
          {[createRoutes(store), notFoundRoute]}
        </Router>
      </BaseRoot>
    );
  }
}
