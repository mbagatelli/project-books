import React, { Component } from "react";

import { signIn as signInService } from "./../services/auth";

import "./SignIn.scss";

class SignInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
    const { email, password } = this.state;
    try {
      const user = await signInService({ email, password });
      this.props.changeAuthenticationStatus(user);
      this.props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className='main' id='signin'>
        <section className='sign-in'>
          <div className='container'>
            <div className='signin-content'>
              <div className='signin-form'>
                <h2 className='form-title'>Sign In</h2>
                <form
                  onSubmit={this.handleFormSubmission}
                  className='register-form'
                  id='login-form'
                >
                  <div className='form-group'>
                    <label htmlFor='email' />
                    <input
                      required
                      type='email'
                      placeholder='Email'
                      value={this.state.email}
                      name='email'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password' />
                    <input
                      required
                      type='password'
                      placeholder='Password'
                      value={this.state.password}
                      name='password'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='form-group form-button'>
                    <button className='btn btn-primary'>Sign In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default SignInView;

/*       <main>
          <form onSubmit={this.handleFormSubmission}>
            <label>Email:</label> <br />
            <input
              required
              type='email'
              placeholder='Email'
              value={this.state.email}
              name='email'
              onChange={this.handleInputChange}
            />{" "}
            <br />
            <label>Password:</label> <br />
            <input
              required
              type='password'
              placeholder='Password'
              value={this.state.password}
              name='password'
              onChange={this.handleInputChange}
            />{" "}
            <br />
            <button>Sign In</button>
          </form>
        </main> */
