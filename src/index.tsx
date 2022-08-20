import * as ErrorBoundary from 'components/ErrorBoundary';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SplashScreen from 'routes/components/SplashScreen';
import preroot from 'utilities/preroot';

preroot();

const container = document.getElementById('root')!;
const root = createRoot(container);
const App = lazy(() => import('App'));

root.render(
  <StrictMode>
    <ErrorBoundary.Wrapper>
    <BrowserRouter>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
      </BrowserRouter>
    </ErrorBoundary.Wrapper>
  </StrictMode>,
);
