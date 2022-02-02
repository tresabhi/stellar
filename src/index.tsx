import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import SplashScreen from 'routes/SplashScreen';
import { primeWorker } from 'utilities/serviceWorker';

const LOCAL_HOST_NAMES = ['localhost', '127.0.0.1'];

const App = lazy(() => import('App'));

if (!LOCAL_HOST_NAMES.includes(window.location.hostname)) primeWorker();

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
