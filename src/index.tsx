import * as ErrorBoundary from 'components/ErrorBoundary';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SplashScreenLegacy from 'routes/components/SplashScreen';
import preroot from 'utilities/preroot';

preroot();

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
const App = lazy(() => import('App'));

root.render(
  <StrictMode>
    <ErrorBoundary.Wrapper>
      <BrowserRouter>
        <Suspense fallback={<SplashScreenLegacy />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary.Wrapper>
  </StrictMode>,
);
