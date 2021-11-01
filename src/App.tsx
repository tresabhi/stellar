import { lazy, Suspense } from 'react';

const App = () => {
  const Routed = lazy(() => import('Routed'));

  return (
    <Suspense fallback={<h1>Temporary loading screen...</h1>}>
      <Routed />
    </Suspense>
  );
};

export default App;
