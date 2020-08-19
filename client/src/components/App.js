import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePageSignIn from "./HomePageSignIn";
import HomePage from "./HomePage";
import Profile from "./Profile";
import GroceryList from "./GroceryList";
import FourOhFour from "./FourOhFour";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePageSignIn />
        </Route>
        <Route exact path="/homepage">
          <HomePage />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/grocerylist">
          <GroceryList />
        </Route>
        <Route exact path="/*">
          <FourOhFour />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
