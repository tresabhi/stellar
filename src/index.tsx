import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import SplashScreen from 'routes/SplashScreen';
import { primeWorker } from 'utilities/serviceWorker';

primeWorker();

const App = lazy(() => import('App'));

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
