import { Route, Routes } from 'react-router-dom';
import Interface from 'routes/components/Interface';
import SplashScreen from 'routes/components/SplashScreen';
import { styled, theme } from 'stitches.config';
import useSettings from 'stores/useSettings';
import 'styles/index.scss';
import usePrerender from 'utilities/usePrerender';

const AppContainer = styled('div', {
  backgroundColor: theme.colors.appBackground1,
});

const App = () => {
  usePrerender();
  const theme = useSettings((state) => state.interface.theme);

  return (
    <AppContainer className={theme}>
      <Routes>
        <Route path="/" element={<SplashScreen navigateTo="/interface" />} />
        <Route path="/interface" element={<Interface />} />
      </Routes>
    </AppContainer>
  );
};
export default App;
