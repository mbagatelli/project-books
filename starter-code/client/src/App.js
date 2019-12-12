import React, { Component } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";

import Routes from "./components/Routes";

import { loadUserInformation as loadUserInformationService } from "./services/auth";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false
    };
    this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(
      this
    );
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await loadUserInformationService();
      this.setState({
        user,
        loaded: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  changeAuthenticationStatus(user) {
    this.setState({
      user
    });
  }

  verifyAuthentication() {
    return this.state.user;
  }

  render() {
    const user = this.state.user;
    return (
      <BrowserRouter>
        <NavBar
          user={user}
          changeAuthenticationStatus={this.changeAuthenticationStatus}
        />
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
