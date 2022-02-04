import useStellarContext from 'hooks/useStellarContext';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import SplashScreen from 'routes/SplashScreen';
import { primeWorker } from 'utilities/serviceWorker';
import packageJSON from '../package.json';

const LOCAL_HOST_NAMES = ['localhost', '127.0.0.1'];

if (!LOCAL_HOST_NAMES.includes(window.location.hostname)) primeWorker();

const App = lazy(() => import('App'));

if (useStellarContext().codeName !== 'dev') {
  console.log(
    '%cWARNING!',
    `
    background-color: red;
    color: white;
    font-size: 32px;
    font-weight: bold;
  `,
  );
  console.log(
    `%cDo not paste in anything here unless you know what you are doing!\n\nMalicious code can harm ${packageJSON.name} and your data (blueprints, snippets, etc.) permanently`,
    `
    background-color: orange;
    color: white;
    font-weight: bold;
    font-size: 16px;
  `,
  );
}

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
