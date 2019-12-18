import React, { Component } from "react";
import { Link } from "react-router-dom";

import { loadUserInformation as loadUserService } from "./../services/auth";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  async componentDidMount() {
    const id = this.props.user._id;
    //console.log("id", id);
    try {
      const user = await loadUserService(id);
      this.setState({
        user
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const user = this.state.user;
    //console.log(user.username);
    return (
      <div>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <h2>Email:</h2>
            <h3>{user.email}</h3>
            <h2>Location:</h2>
            <h3>{user.location}</h3>
            <h2>Coins:</h2>
            <h3>{user.coins}</h3>
            <h3>User Since:</h3>
            <Link to={`/user/edit/${user._id}`}>Edit Profile</Link>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileView;
