import { primeWorker } from 'utilities/serviceWorker';
import blueprintStore from 'stores/blueprint';
import produce from 'immer';
import { lazy, StrictMode, Suspense } from 'react';
import { render } from 'react-dom';
import SplashScreen from 'routes/SplashScreen';

primeWorker();

const App = lazy(() => import('App'));

//@ts-ignore
window.q = blueprintStore;
//@ts-ignore
window.w = produce;

render(
  <StrictMode>
    <Suspense fallback={<SplashScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
  document.getElementById('root'),
);
