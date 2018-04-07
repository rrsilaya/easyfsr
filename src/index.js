import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './assets/fonts/lineto-font.css';
import './assets/fonts/calibri-font.css';
import './index.css';
import './app/styles.css';
import App from './app/AppContainer';
import store from './app/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
