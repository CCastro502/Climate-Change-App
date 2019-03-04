import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
        <>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile/:email" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
        </>
    </Router>
  );
}

export default App;
