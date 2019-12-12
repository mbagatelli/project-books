import React, { Component } from "react";

import { signUp as signUpService } from "./../services/auth";

class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      location: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const { email, username, password, location } = this.state;
    try {
      const user = await signUpService({ email, username, password, location });
      this.props.changeAuthenticationStatus(user);
      this.props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        <form onSubmit={this.handleFormSubmission}>
          <label>Username:</label> <br />
          <input
            type='text'
            value={this.state.username}
            name='username'
            onChange={this.handleInputChange}
          />
          <br />
          <label>Email:</label> <br />
          <input
            type='email'
            value={this.state.email}
            name='email'
            onChange={this.handleInputChange}
          />
          <br />
          <label>Password:</label> <br />
          <input
            type='password'
            value={this.state.password}
            name='password'
            onChange={this.handleInputChange}
          />
          <br />
          <label>Location:</label> <br />
          <input
            type='text'
            value={this.state.location}
            name='location'
            onChange={this.handleInputChange}
          />
          <br />
          <button>Sign Up</button>
        </form>
      </main>
    );
  }
}

export default SignUpView;
