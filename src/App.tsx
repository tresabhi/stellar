import useStellarContext from 'core/hooks/useStellarContext';
import { isMobile } from 'react-device-detect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';

import 'styles/index.scss'; // layout

const Routed = () => {
  const stellarContext = useStellarContext();

  // TODO: use `useNavigate`
  if (window.location.pathname === '/')
    window.location.pathname = isMobile ? '/mobile' : '/desktop';

  document.title = `${stellarContext.title} v${stellarContext.version}`;

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
