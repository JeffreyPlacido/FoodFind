import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Login from "./Login";
import HomePage from "./HomePage";
import Profile from "./Profile";
import GroceryList from "./GroceryList";
import FourOhFour from "./FourOhFour";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
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
