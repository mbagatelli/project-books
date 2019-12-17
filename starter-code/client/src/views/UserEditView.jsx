import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

import {
  loadUserInformation as loadUserService,
  edit as editUserService
} from "./../services/auth";

class UserEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await loadUserService();
      //console.log("user", user);
      this.setState({
        user
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    //console.log("funciona?", this.props.match.params.id);
    const user = this.state.user;
    const id = user._id;
    try {
      //console.log("before the await", id, user);
      await editUserService(id, user);
      this.props.history.push(`/user/profile`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.state.user;
    return (
      <Fragment>
        {user && (
          <Form onSubmit={this.handleFormSubmission}>
            <h3>{user.username}</h3>
            {/* This needs to get removed */}
            <Form.Group controlId='username'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                name='username'
                value={user.username}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='location'>
              <Form.Label>Location:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Location'
                name='location'
                value={user.location}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                placeholder='Email'
                name='email'
                value={user.email}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            {/*             <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Location'
                name='location'
                value={user.location}
                onChange={this.handleInputChange}
              />
            </Form.Group> */}
            {/*             <Form.Group controlId='image'>
              <Form.Label>User photo:</Form.Label>
              <br />
              <img src={user.image} alt='' />
              <br />
              <input
                type='file'
                name='image'
                onChange={this.handleFileChange}
              />
            </Form.Group> */}
            <Button variant='primary' type='submit'>
              Edit User
            </Button>
          </Form>
        )}
      </Fragment>
    );
  }
}

export default UserEditView;
