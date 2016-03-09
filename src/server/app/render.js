import {renderToString} from 'react-dom/server';
import {createElement} from 'react';

import Root from 'component/root';
import DocumentTitle from 'component/document-title';

export default (req) => {
  const {
    store,
    router: {
      renderProps,
    },
  } = req.clientContext;

  return () => {
    const markup = renderToString(
      <Root
        store={store}
        renderProps={renderProps}
      />
    );

    // IMPORTANT!! Call static method `rewind` on any components wrapped with
    // `react-side-effect` to prevent server memory from leaking.
    // See: https://github.com/gaearon/react-side-effect#api
    const title = DocumentTitle.rewind();

    return {
      markup,
      title,
    };
  };
};
