import App from 'App';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);
