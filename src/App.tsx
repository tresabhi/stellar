import SplashScreen from 'components/SplashScreen';
import { lazy, Suspense } from 'react';

const App = () => {
  const Routed = lazy(() => import('Routed'));

  return (
    <Suspense fallback={<SplashScreen />}>
      <Routed />
    </Suspense>
  );
};

export default App;
