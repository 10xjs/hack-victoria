import {createElement, Component, PropTypes} from 'react';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element,
  };

  render() {
    const {children} = this.props;
    return <div>{children}</div>;
  }
}
