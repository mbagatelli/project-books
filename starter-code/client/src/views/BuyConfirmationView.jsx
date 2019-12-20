import React, { Component } from 'react'

export default class BuyConfirmationView extends Component {
  render() {
    return (
      <div className="d-flex flex-column align-items-center text-center m-5 ">
        <h1 className="mb-5">Request Sent</h1>

        <p style={{fontSize: '1.5em'}}>The seller will let you know when it's on it's way</p>
      </div>
    )
  }
}
