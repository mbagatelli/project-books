import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import HomeView from "../views/HomeView";
import SignUpView from "../views/SignUpView";
import SignInView from "../views/SignInView";

class Routes extends Component {
  render() {
    return (
      <Fragment>
        <Route path='/sign-up' component={SignUpView} />
        <Route path='/sign-in' component={SignInView} />
        <Route path='/' exact component={HomeView} />
      </Fragment>
    );
  }
}

export default Routes;
