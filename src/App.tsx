import useStellarName from 'core/hooks/useStellarName';
import { isMobile } from 'react-device-detect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';

import 'styles/index.scss'; // layout

const Routed = () => {
  // TODO: use `useNavigate`
  if (window.location.pathname === '/')
    window.location.pathname = isMobile ? '/mobile' : '/desktop';

  document.title = useStellarName();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="mobile" element={<Mobile />} />
        <Route path="desktop" element={<Desktop />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routed;
