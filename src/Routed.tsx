import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'routes/Home';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';
import Install from 'routes/Install';

const Routed = () => {
  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default Routed;
