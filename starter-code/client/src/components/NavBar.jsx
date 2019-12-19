import React, { Component, Fragment } from "react";
import { signOut as signOutService } from "./../services/auth";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.onSignOutTrigger = this.onSignOutTrigger.bind(this);
  }

  async onSignOutTrigger() {
    try {
      await signOutService();
      this.props.changeAuthenticationStatus(null);
    } catch (error) {
      console.log(error);
    }
  }

  // handleToggleMenu = event => {
  //   let navbarState = { ...this.state};
  //   console.log('NAVBAR STATE: ', navbarState);
  //   if (navbarState === "navbar-toggler collapsed") {
  //     this.setState({
  //       navbarState: "navbar-toggler"
  //     });
  //   } else {
  //     this.setState({
  //       navbarState: "navbar-toggler collapsed"
  //     });
  //   }
  // }

  render() {
    let user;
    if (this.props.user) {
      user = this.props.user;
    }

    // console.log('NAVBAR PROPS: ', this.props);
    // console.log('NAVBAR STATE: ', this.state.navbarState);
    // console.log('USER: ', user);

    return (
      <Navbar collapseOnSelect bg='light' expand='lg'>
        <Navbar.Brand as={Link} to='/'>
          Valdiviana
        </Navbar.Brand>
        {user && (
          <Nav.Link className='navbar-brand'>Coins: {user.coins}</Nav.Link>
        )}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {(user && (
              <div className='nav navbar-nav navbar-right'>
                <Nav.Link as={NavLink} to='/book/buy'>
                  Buy
                </Nav.Link>
                <Nav.Link as={NavLink} to='/book/sell/search'>
                  Sell
                </Nav.Link>
                <Nav.Link as={NavLink} to='/user/checkout'>
                  Checkout
                </Nav.Link>
                {/* <NavDropdown title={user.username} id="basic-nav-dropdown">
                  <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', position: 'relative', right: '3em'}}>
                    <Link as={NavLink} to='/user/profile'>Profile</Link>
                    <Link as={NavLink} to='/' onClick={this.onSignOutTrigger}>Sign Out</Link>
                  </div>
                </NavDropdown> */}
                <Nav.Link as={NavLink} to='/user/profile'>
                  Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to='/' onClick={this.onSignOutTrigger}>
                  Sign Out
                </Nav.Link>
              </div>
            )) || (
              <Fragment>
                <Nav.Link as={NavLink} to='/user/sign-in'>
                  Sign-In
                </Nav.Link>
                <Nav.Link as={NavLink} to='/user/sign-up'>
                  Sign-Up
                </Nav.Link>
              </Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
