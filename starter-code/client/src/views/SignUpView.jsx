import React, { Component } from "react";

import { signUp as signUpService } from "./../services/auth";

import "./SignUp.scss";

class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      location: "",
      address: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    //this.handleFileChange = this.handleFileChange.bind(this);
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
    const { email, username, password, location, address } = this.state;
    try {
      const user = await signUpService({
        email,
        username,
        password,
        location,
        address
      });
      this.props.changeAuthenticationStatus(user);
      this.props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  /*   handleFileChange(event) {
    console.dir(event.target.files);
    const file = event.target.files[0];
    this.setState({
      user: {
        ...this.state.user,
        image: file
      }
    });
  } */

  render() {
    return (
      <div className='main' id='signup'>
        <section className='signup'>
          <div className='container'>
            <div className='signup-content'>
              <div className='signup-form'>
                <h2 className='form-title'>Sign up</h2>
                <form onSubmit={this.handleFormSubmission}>
                  <div className='form-group'>
                    <label htmlFor='username'></label>
                    <input
                      type='text'
                      placeholder='Your User Name'
                      value={this.state.username}
                      name='username'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'></label>
                    <input
                      type='email'
                      name='email'
                      value={this.state.email}
                      placeholder='Your Email'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'></label>
                    <input
                      type='password'
                      name='password'
                      value={this.state.password}
                      placeholder='Password'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='address'></label>
                    <input
                      type='text'
                      value={this.state.address}
                      name='address'
                      onChange={this.handleInputChange}
                      placeholder='Address'
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='location'></label>
                    <input
                      type='text'
                      value={this.state.location}
                      placeholder='Location'
                      name='location'
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div className='form-group form-button'>
                    <button className='btn btn-primary'>Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      /*       <main>
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
          <label>Adress:</label> <br />
          <input
            type='text'
            value={this.state.adress}
            name='adress'
            onChange={this.handleInputChange}
          />
          <br />
                     <label>Photo:</label> <br />
          <input type='file' name='image' onChange={this.handleFileChange} />
          <br /> 
          <button>Sign Up</button>
        </form>
      </main> */
    );
  }
}

export default SignUpView;
