import * as ErrorBoundary from 'components/ErrorBoundary';
import { enableMapSet, enablePatches } from 'immer';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from 'routes/SplashScreen';
import applyThreeMeshBVHPatches from 'utilities/applyThreeMeshBVHPatches';
import registerThreeElements from 'utilities/registerThreeElements';
import { primeServiceWorker } from 'utilities/serviceWorkerRegistration';

primeServiceWorker();
registerThreeElements();
applyThreeMeshBVHPatches();
enableMapSet();
enablePatches();

const container = document.getElementById('root')!;
const root = createRoot(container);
const App = lazy(() => import('App'));

root.render(
  <StrictMode>
    <ErrorBoundary.Wrapper>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </ErrorBoundary.Wrapper>
  </StrictMode>,
);
