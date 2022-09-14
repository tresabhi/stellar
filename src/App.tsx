import { usePrerender } from 'hooks/usePrerender';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'routes/Home';
import Interface from 'routes/Interface';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/useSettings';

const AppContainer = styled('div', {
  backgroundColor: theme.colors.appBackground1,
  // TODO: make this the one that controls the dimensions of the app
});

const App = () => {
  const theme = useSettings((state) => state.interface.theme);

  usePrerender();

  return (
    <AppContainer className={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interface" element={<Interface />} />
      </Routes>
    </AppContainer>
  );
};
export default App;
