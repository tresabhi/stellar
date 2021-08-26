import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Desktop from "routes/Desktop";
import Mobile from "routes/Mobile";

import "styles/index.css";

const App = () => {
  return (
    <Router>
      <Switch>
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
