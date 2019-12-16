import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";

import HomeView from "./views/HomeView";
import SignUpView from "./views/SignUpView";
import SignInView from "./views/SignInView";
import ProfileView from "./views/ProfileView";
import SellView from "./views/SellView";
import UserEditView from "./views/UserEditView";
import BookEditView from "./views/BookEditView";

import BuyView from "./views/BuyView";

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
    //this.verifyAuthentication = this.verifyAuthentication.bind(this);
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

  //protection
  /*   verifyAuthentication() {
    return this.state.user;
  } */

  render() {
    const user = this.state.user;
    return (
      <BrowserRouter>
        <NavBar
          user={user}
          changeAuthenticationStatus={this.changeAuthenticationStatus}
        />
        {this.state.loaded && (
          <Switch>
            <Route
              path='/user/sign-up'
              render={props => (
                <SignUpView
                  {...props}
                  changeAuthenticationStatus={this.changeAuthenticationStatus}
                />
              )}
            />
            <Route
              path='/user/sign-in'
              render={props => (
                <SignInView
                  {...props}
                  changeAuthenticationStatus={this.changeAuthenticationStatus}
                />
              )}
            />
            <Route
              path='/user/profile'
              render={props => <ProfileView {...props} user={user} />}
            />
            <Route
              path='/book/sell'
              render={props => <SellView {...props} user={user} />}
            />
            <Route path='/book/buy' component={BuyView} />
            <Route path='/book/:id/edit' component={BookEditView} />
            <Route path='/book/:id' component={BookEditView} />
            <Route path='/user/edit' component={UserEditView} />
            <Route path='/' exact component={HomeView} />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
