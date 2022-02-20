import getStellarContext from 'hooks/useStellarContext';
import { enableMapSet } from 'immer';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import SplashScreen from 'routes/SplashScreen';
import { primeWorker } from 'utilities/serviceWorker';

if (getStellarContext().codeName !== 'alpha') primeWorker();
enableMapSet();

const App = lazy(() => import('App'));

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
