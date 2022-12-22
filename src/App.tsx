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
  useEffect(() => {
    const element = document.body;
    const initialTheme = useSettings.getState().interface.theme;
    const unsubscribe = useSettings.subscribe(
      (state) => state.interface.theme,
      (nextTheme, prevTheme) => {
        if (prevTheme) element.classList.remove(prevTheme);
        if (nextTheme) element.classList.add(nextTheme);
      },
    );

    if (initialTheme) element.classList.add(initialTheme);

    return () => unsubscribe();
  });
};

function App() {
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
}
export default App;
