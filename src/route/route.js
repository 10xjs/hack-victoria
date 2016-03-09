import {createElement} from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'component/app';

import Index from 'component/handler/index';
import Film from 'component/handler/film';

export default (/* store */) => {
  return (
    <Route key='routes' path='/' component={App}>
      <IndexRoute component={Index}/>
      <Route path='film/:title' component={Film}/>
    </Route>
  );
};
