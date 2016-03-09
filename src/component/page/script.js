import {createElement, Component, PropTypes} from 'react';

class Script extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    url: PropTypes.string,
    content: PropTypes.string,
  };

  render() {
    const {url, content, type, id} = this.props;
    if (url) {
      return <script type={type} src={url}/>;
    }

    if (content) {
      const innerHtml = {__html: content};
      return <script type={type} id={id} dangerouslySetInnerHTML={innerHtml}/>;
    }

    return null;
  }
}

export default Script;
