import 'App.css';
import * as ErrorBoundary from 'components/ErrorBoundary';
import { LandscapePrompt } from 'components/LandscapePrompt';
import { usePrerender } from 'hooks/usePrerender';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'routes/Home';
import Interface from 'routes/Interface';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/settings';

const AppContainer = styled('div', {
  backgroundColor: theme.colors.appBackground1,
  width: '100vw',
  height: '100vh',
  padding:
    'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
});

const useRootTheme = () => {
  const theme = useSettings((state) => state.interface.theme);

  useEffect(() => {
    if (theme) {
      document.body.classList.add(theme);
      return () => document.body.classList.remove(theme);
    }
  });
};

const App = () => {
  useRootTheme();
  usePrerender();

  return (
    <ErrorBoundary.Wrapper>
      <LandscapePrompt>
        <AppContainer>
          <Routes>
            <Route path="/interface" element={<Interface />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AppContainer>
      </LandscapePrompt>
    </ErrorBoundary.Wrapper>
  );
};
export default App;
