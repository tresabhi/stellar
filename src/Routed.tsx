import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from 'routes/Home';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';
import Install from 'routes/Install';

const Routed = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/desktop">
          <Desktop />
        </Route>
        <Route exact path="/mobile">
          <Mobile />
        </Route>
        <Route exact path="/install">
          <Install />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routed;
