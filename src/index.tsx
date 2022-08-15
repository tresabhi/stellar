import * as ErrorBoundary from 'components/ErrorBoundary';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from 'routes/components/SplashScreen';
import prerender from 'utilities/prerender';

prerender();

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
