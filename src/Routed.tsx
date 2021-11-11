import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from 'routes/Home';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';
import Install from 'routes/Install';

const Routed = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/desktop">
          <Desktop />
        </Route>
        <Route path="/mobile">
          <Mobile />
        </Route>
        <Route path="/install">
          <Install />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routed;
