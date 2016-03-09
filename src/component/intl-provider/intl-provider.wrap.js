import {IntlProvider} from 'react-intl';
import {connect} from 'react-redux';

import {localeSelector} from 'selector/intl.selector';

const mapState = (state) => ({
  locale: localeSelector(state),
  defaultLocale: 'en-US',
  messages: {},
});

export default connect(mapState)(IntlProvider);
