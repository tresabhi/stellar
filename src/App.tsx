import 'App.css';
import * as ErrorBoundary from 'components/ErrorBoundary';
import { LandscapePrompt } from 'components/LandscapePrompt';
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
});

const App = () => {
  const theme = useSettings((state) => state.interface.theme);

  usePrerender();

  return (
    <ErrorBoundary.Wrapper className={theme}>
      <LandscapePrompt className={theme}>
        <AppContainer className={theme}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interface" element={<Interface />} />
          </Routes>
        </AppContainer>
      </LandscapePrompt>
    </ErrorBoundary.Wrapper>
  );
};
export default App;
