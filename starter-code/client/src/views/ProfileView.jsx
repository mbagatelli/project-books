import React, { Component } from "react";

class ProfileView extends Component {
  render() {
    const user = this.props.user;
    console.log(user);
    return (
      <div>
        <h1>Private</h1>
        {user && (
          <div>
            <h1>{user.username}</h1>
            <h5>{user.email}</h5>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileView;
