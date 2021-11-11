import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Home from 'routes/Home';
import Mobile from 'routes/Mobile';

const Routed = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="desktop" element={<Desktop />} />
          <Route path="mobile" element={<Mobile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routed;
