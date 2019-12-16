import React, { Component, Fragment } from "react";
import { signOut as signOutService } from "./../services/auth";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav
  //NavDropdown,
  //Form,
  //Button,
  //FormControl
} from "react-bootstrap";
/* import Nav from "react-bootstrap/Nav";
import NavDropDown from "react-bootstrap/NavDropdown" */
import "./NavBar.scss";

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

  render() {
    const user = this.props.user;
    return (
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand as={Link} to='/'>
          Books Title
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            {(user && (
              <div className='nav navbar-nav navbar-right'>
                <Fragment>
                  <Nav.Link as={Link} to='/user/profile'>
                    Profile
                  </Nav.Link>
                  <Nav.Link as={Link} to='/book/buy'>
                    Buy
                  </Nav.Link>
                  <Nav.Link as={Link} to='/book/sell'>
                    Sell
                  </Nav.Link>
                  <button className='sign-out' onClick={this.onSignOutTrigger}>
                    Sign Out
                  </button>
                </Fragment>
              </div>
            )) || (
              <Fragment>
                <Nav.Link as={Link} to='/user/sign-in'>
                  Sign-In
                </Nav.Link>
                <Nav.Link as={Link} to='/user/sign-up'>
                  Sign-Up
                </Nav.Link>
              </Fragment>
            )}

            {/*             <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {/*           <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
