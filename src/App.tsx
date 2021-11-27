import useStellarName from 'core/hooks/useStellarName';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Home from 'routes/Home';
import Mobile from 'routes/Mobile';

const Routed = () => {
  document.title = useStellarName();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="mobile" element={<Mobile />} />
        <Route path="desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routed;
