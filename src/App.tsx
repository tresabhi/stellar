import 'App.css';
import * as ErrorBoundary from 'components/ErrorBoundary';
import { LandscapePrompt } from 'components/LandscapePrompt';
import * as Toast from 'components/Toast';
import { usePrerender } from 'hooks/usePrerender';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'routes/Home';
import Interface from 'routes/Interface';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/useSettings';

const AppContainer = styled('div', {
  backgroundColor: theme.colors.appBackground1,
  width: '100vw',
  height: '100vh',
  padding:
    'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
});

const App = () => {
  const theme = useSettings((state) => state.interface.theme);

  usePrerender();

  return (
    <ErrorBoundary.Wrapper className={theme}>
      <LandscapePrompt className={theme}>
        <Toast.Provider duration={Infinity} swipeThreshold={Infinity}>
          <AppContainer className={theme}>
            <Routes>
              <Route path="/interface" element={<Interface />} />
              <Route path="*" element={<Home />} />
            </Routes>

            <Toast.All />
          </AppContainer>
        </Toast.Provider>
      </LandscapePrompt>
    </ErrorBoundary.Wrapper>
  );
};
export default App;
