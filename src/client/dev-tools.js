import {createElement} from 'react';
import {render} from 'react-dom';

import DevTools from 'component/dev-tools';

const createDevTools = (store) => {
  if (__DEVELOPMENT__) {
    let popup;
    let isOpen = false;

    const persistOpen = () => {
      localStorage.setItem('devToolsOpen', true);
    };

    const persistClosed = () => {
      localStorage.setItem('devToolsOpen', false);
    };

    const isPersisted = () => JSON.parse(localStorage.getItem('devToolsOpen'));

    const toggle = () => {
      if (isOpen) {
        persistClosed();
        close();
      } else {
        persistOpen();
        open();
      }
    };

    const keyHandler = (event) => {
      const charCode = event.keyCode || event.which;
      const char = String.fromCharCode(charCode);

      if (char.toUpperCase() === 'H' && event.ctrlKey) {
        event.preventDefault();
        toggle();
      }
    };

    const close = () => {
      if (!isOpen) {
        return;
      }
      isOpen = false;
      popup.removeEventListener('keydown', keyHandler);
      popup.removeEventListener('beforeunload', persistClosed);
      popup.removeEventListener('beforeunload', close);
      window.removeEventListener('beforeunload', close);

      popup.close();
    };

    const open = () => {
      if (isOpen) {
        return;
      }
      isOpen = true;
      popup = window.open(
        null,
        '',
        'menubar=no,location=no,resizablwie=yes,scrollbars=no,status=no,' +
        'width=400,height=800'
      );

      popup.document.write(
        '<style>body{margin:0;font-family:sans-serif}</style>' +
        '<div id=\'react-devtools-root\'></div>'
      );

      popup.document.title = 'Redux DevTools';

      const element = popup.document.getElementById('react-devtools-root');
      render(<DevTools store={store} />, element);

      popup.addEventListener('keydown', keyHandler);
      popup.addEventListener('beforeunload', persistClosed);
      popup.addEventListener('beforeunload', close);
      window.addEventListener('beforeunload', close);
    };

    window.addEventListener('keydown', keyHandler);

    if (isPersisted()) {
      open();
    }
  }
};

export default createDevTools;
