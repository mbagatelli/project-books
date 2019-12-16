import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProfileView extends Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <h1>Private</h1>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <h5>{user.email}</h5>
            <Link to={`/user/edit/${user._id}`}>Edit Profile</Link>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileView;
