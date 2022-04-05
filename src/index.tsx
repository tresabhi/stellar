import ErrorBoundary from 'components/ErrorBoundary';
import { enableMapSet, enablePatches } from 'immer';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from 'routes/SplashScreen';
import { primeWorker } from 'utilities/serviceWorker';

primeWorker();
enableMapSet();
enablePatches();

const container = document.getElementById('root')!;
const root = createRoot(container);
const App = lazy(() => import('App'));
// const App = () => {
//   throw new Error('message');
// };

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
