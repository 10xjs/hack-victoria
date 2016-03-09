import {createElement, Component, PropTypes} from 'react';

import Script from './script';
import Style from './style';

class Page extends Component {
  static propTypes = {
    markup: PropTypes.string.isRequired,
    meta: PropTypes.arrayOf(PropTypes.object).isRequired,
    scripts: PropTypes.arrayOf(PropTypes.object).isRequired,
    styles: PropTypes.arrayOf(PropTypes.object).isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    locale: PropTypes.string.isRequired,
  };

  render() {
    const {markup, meta, scripts, styles, path, title, locale} = this.props;
    return (
      <html lang={locale}>
        <head>
          {meta.map((tag, i) => <meta key={i} {...tag}/>)}
          <title>{title}</title>
          {styles.map((style, i) => <Style key={i} {...style}/>)}
        </head>
        <body data-path={path}>
          <div id='app' dangerouslySetInnerHTML={{__html: markup}}/>
          {scripts.map((script, i) => <Script key={i} {...script}/>)}
        </body>
      </html>
    );
  }
}

export default Page;
