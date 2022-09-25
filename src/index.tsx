import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SplashScreen from 'routes/components/SplashScreen';

import('utilities/preroot').then((value) => {
  value.default();
});

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
const App = lazy(() => import('App'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
