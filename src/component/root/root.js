import {createElement, Component, PropTypes} from 'react';
import {Provider} from 'react-redux';

import IntlProvider from 'component/intl-provider';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.element,
  };

  render() {
    const {store, children} = this.props;
    return (
      <Provider store={store}>
        <IntlProvider>
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}
