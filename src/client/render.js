import {createElement} from 'react';
import {render} from 'react-dom';

import Root from 'component/root';

export default (store) => {
  const element = document.getElementById('app');
  render(<Root store={store}/>, element);
};
