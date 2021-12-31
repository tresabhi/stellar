import SplashScreen from 'components/SplashScreen';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

serviceWorkerRegistration.register();

const App = lazy(() => import('App'));

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
