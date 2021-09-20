import React from 'react';
import ReactDOM from 'react-dom';
import * as Workbox from 'workbox-webpack-plugin';

import App from './App';

Workbox.register();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
