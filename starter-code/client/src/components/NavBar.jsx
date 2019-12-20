import React, { Component, Fragment } from "react";
import { signOut as signOutService } from "./../services/auth";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import NavImage from "./coin.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.onSignOutTrigger = this.onSignOutTrigger.bind(this);
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }

  async onSignOutTrigger() {
    try {
      await signOutService();
      this.props.changeAuthenticationStatus(null);
    } catch (error) {
      console.log(error);
    }
  }

  handleToggleMenu() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        expanded: false
      });
    }
  }

  render() {
    let user;
    if (this.props.user) {
      user = this.props.user;
    }

    // console.log('NAVBAR PROPS: ', this.props);
    // console.log('NAVBAR STATE: ', this.state.navbarState);
    // console.log('USER: ', user);

    return (
      <Navbar
        fluid='true'
        bg='dark'
        variant='dark'
        expand='lg'
        expanded={this.state.expanded}
      >
        <Navbar.Brand as={Link} to='/' id='logo'>
          {/* <img src="./../images/logo.png" alt="The Book Cellar" height="64rem" className="p-0" /> */}
          The Book Cellar
        </Navbar.Brand>
        {user && (
          <Fragment>
            <Nav.Link className='ml-auto mr-0 navbar-brand coin-value'>
              {user.coins}
            </Nav.Link>
            <img className='coin-image ' src={NavImage} alt='Coin' />
          </Fragment>
        )}
        <Navbar.Toggle
          aria-controls='basic-navbar-nav'
          onClick={this.handleToggleMenu}
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {(user && (
              <div className='nav navbar-nav navbar-right'>
                <Nav.Link as={NavLink} to='/book/buylist'>
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
