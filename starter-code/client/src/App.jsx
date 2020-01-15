import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import NavBar from "./components/NavBar";

import HomeView from "./views/HomeView";
import SignUpView from "./views/SignUpView";
import SignInView from "./views/SignInView";
import ProtectedRoute from "./components/ProtectedRoutes";
import ProfileView from "./views/ProfileView";
import SellView from "./views/SellView";
import UserEditView from "./views/UserEditView";
import BookEditView from "./views/BookEditView";
import SellSearchView from "./views/SellSearchView";
import StripeCheckoutView from "./views/StripeCheckoutView";
import NotFoundComponent from "./components/NotFound";
import ErrorView from "./views/ErrorView";
import BuyView from "./views/BuyView";
import BuyListView from "./views/BuyListView";
import BookBuyView from "./views/BookBuyView";
import BuyConfirmationView from "./views/BuyConfirmationView";

import { loadUserInformation as loadUserInformationService } from "./services/auth";

import "./App.css";

const NavBarWithRouter = withRouter(NavBar);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loaded: false,
      book: null,
      receiver: {
        fullName: null,
        address: null
      }
    };
    this.changeAuthenticationStatus = this.changeAuthenticationStatus.bind(
      this
    );
    this.updateCurrentBook = this.updateCurrentBook.bind(this);
    this.verifyAuthentication = this.verifyAuthentication.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateReceiver = this.updateReceiver.bind(this);
  }

  async componentDidMount() {
    this.updateUser();
  }
  
  async updateUser() {
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

  componentDidUpdate() {
    //console.log("App.jsx componentDidUpdate: ", this.state.user);
  }

  changeAuthenticationStatus(user) {
    this.setState({
      user
    });
  }

  verifyAuthentication() {
    return this.state.user;
  }

  updateCurrentBook(book) {
    this.setState({
      book
    });
  }

  updateReceiver(name, address) {
    this.setState({
      ...this.state,
      receiver: {
        fullName: name,
        address: address
      }
    })
  }

  searchBuyBooks(query) {}

  //protection
  /*   verifyAuthentication() {
    return this.state.user;
  } */

  render() {
    const user = this.state.user;
    return (
      <BrowserRouter>
        <NavBarWithRouter
          user={user}
          changeAuthenticationStatus={this.changeAuthenticationStatus}
          props={this.props}
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
            <ProtectedRoute
              path='/user/profile'
              render={props => <ProfileView {...props} user={user} />}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            {/* <Route
              path='/user/profile'
              render={props => <ProfileView {...props} user={user} />}
            /> */}
            <ProtectedRoute
              path='/book/sell/search'
              render={props => (
                <SellSearchView
                  {...props}
                  user={user}
                  updateCurrentBook={this.updateCurrentBook}
                />
              )}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            {/* <Route
              path='/book/sell/search'
              render={props => (
                <SellSearchView
                  {...props}
                  user={user}
                  updateCurrentBook={this.updateCurrentBook}
                />
              )}
            /> */}
            {/* <Route
              path='/book/sell'
              render={props => (
                <SellView {...props} user={user} book={this.state.book} />
              )}
            /> */}
            <ProtectedRoute
              path='/book/sell'
              render={props => (
                <SellView {...props} user={user} book={this.state.book} />
              )}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            {/* <Route
              path='/user/checkout'
              render={props => <StripeCheckoutView {...props} user={user} />}
            /> */}
            <Route
              path='/book/buylist'
              render={props => <BuyListView {...props} user={user} />}
            />
            <ProtectedRoute
              path='/buy/:id'
              render={props => <BookBuyView {...props} user={user} updateReceiver={this.updateReceiver}/>}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            <Route path='/book/:id/edit' exact component={BookEditView} />
            <ProtectedRoute
              path='/book/:id'
              render={props => <BuyView {...props} user={user} />}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            <ProtectedRoute
              path='/user/checkout'
              render={props => <StripeCheckoutView {...props} user={user} updateUser={this.updateUser}/>}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            <ProtectedRoute
              exact
              path='/confirmation'
              render={props => <BuyConfirmationView {...props} user={user} receiver={this.state.receiver}/>}
              verify={this.verifyAuthentication}
              redirect='/error/401'
            />
            <Route path='/error/:code' component={NotFoundComponent} />

            {/* <Route path='/user/edit' component={UserEditView} /> */}
            <Route
              path='/user/edit'
              render={props => (
                <UserEditView
                  {...props}
                  user={user}
                  updateUser={this.updateUser}
                />
              )}
            />

            <Route path='/' exact component={HomeView} />

            <Route path='/error/:code' component={ErrorView} />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
