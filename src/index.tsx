import * as ErrorBoundary from 'components/ErrorBoundaryLegacy';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SplashScreenLegacy from 'routes/components/SplashScreen';
import preroot from 'utilities/preroot';

preroot();

const container = document.getElementById('root')!;
const root = createRoot(container);
const App = lazy(() => import('App'));

root.render(
  <StrictMode>
    <ErrorBoundary.WrapperLegacy>
      <BrowserRouter>
        <Suspense fallback={<SplashScreenLegacy />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary.WrapperLegacy>
  </StrictMode>,
);
