import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';
import SplashScreen from 'routes/SplashScreen';
import 'styles/index.scss';
import usePostrender from 'utilities/usePostrender';

const App = () => {
  usePostrender();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
