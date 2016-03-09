/* global document */
import {injectIntl} from 'react-intl';
import withSideEffect from 'react-side-effect';
import hoistStatics from 'hoist-non-react-statics';

import DocumentTitle from './document-title.js';

const formatTitle = (props) => {
  // TODO: Format title using React Intl.
  // const {formatMessage} = props.intl;

  return props.title;
};

const reducePropsToState = (propsList) => {
  const innermostProps = propsList[propsList.length - 1];

  if (innermostProps) {
    return formatTitle(innermostProps);
  }
};

const handleStateChangeOnClient = (title) => {
  document.title = title || '';
};

const SideEffectDocumentTitle = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);

// Hoist static methods here since `injectIntl` does not do so. This is
// necessary to make `DocumentTitle.rewind()` available.
export default hoistStatics(
  injectIntl(SideEffectDocumentTitle),
  SideEffectDocumentTitle,
);
