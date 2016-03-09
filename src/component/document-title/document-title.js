import {Component, PropTypes, Children} from 'react';
import {intlShape} from 'react-intl';

export default class DocumentTitle extends Component {
  static propTypes = {
    children: PropTypes.element,
    intl: intlShape.isRequired,
    title: PropTypes.string,
  };

  render() {
    const {children} = this.props;
    if (children) {
      return Children.only(children);
    }
    return null;
  }
}
