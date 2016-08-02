import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';

import { importAndSyncToLocal } from './actions/shell'
import shellEditFormValidation from './validations/ShellEditFormValidation'

injectTapEventPlugin();

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

const { ipcRenderer } = require('electron');

ipcRenderer.on('shell-url', (e, url) => {
  const decodedUrl = atob(url)
  const shellData = JSON.parse(decodedUrl)

  const errors = shellEditFormValidation(shellData)
  if (Object.keys(errors).length) {
    console.log(errors)
    return
  }

  store.dispatch(importAndSyncToLocal(shellData))
});

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
