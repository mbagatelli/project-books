import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";

import Routes from "./components/Routes";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
