import { extend } from '@react-three/fiber';
import ErrorBoundary from 'components/ErrorBoundary';
import { enableMapSet, enablePatches } from 'immer';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from 'routes/SplashScreen';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { primeWorker } from 'utilities/serviceWorker';

primeWorker();
enableMapSet();
enablePatches();

extend({ Line2, LineGeometry, LineMaterial });

const container = document.getElementById('root')!;
const root = createRoot(container);
const App = lazy(() => import('App'));

root.render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>,
);
