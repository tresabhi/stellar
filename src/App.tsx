import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'routes/Home';
import Desktop from 'routes/Desktop';
import Mobile from 'routes/Mobile';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Desktop">
          <Desktop />
        </Route>
        <Route exact path="/Mobile">
          <Mobile />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
