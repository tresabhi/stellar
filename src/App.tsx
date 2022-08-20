import { Route, Routes } from 'react-router-dom';
import Interface from 'routes/components/Interface';
import SplashScreen from 'routes/components/SplashScreen';
import 'styles/index.scss';
import usePrerender from 'utilities/usePrerender';

const App = () => {
  usePrerender();

  return (
    <Routes>
      <Route path="/" element={<SplashScreen navigateTo="/interface" />} />
      <Route path="/interface" element={<Interface />} />
    </Routes>
  );
};
export default App;
