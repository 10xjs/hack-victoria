import {createElement, Component, PropTypes} from 'react';

class Style extends Component {
  static propTypes = {
    url: PropTypes.string,
    content: PropTypes.string,
  };

  render() {
    const {url, content} = this.props;

    if (url) {
      return <link rel='stylesheet' href={url}/>;
    }

    if (content) {
      const innerHtml = {__html: content};
      return <link rel='stylesheet' dangerouslySetInnerHTML={innerHtml}/>;
    }
  }
}

export default Style;
