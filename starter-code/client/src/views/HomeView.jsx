import React, { Component } from "react";
import './HomeView.css';

class HomeView extends Component {
  render() {
    return (
    <div className="home">
      <div className="mission">
        <div className="home-content">
          <h2 className="m-5">Books are expensive.</h2>
          <p>For many people books are just too expensive and others have books collecting dust on shelfs.</p>
          <p className="mt-5">What if we could change that?</p>
        </div>
      </div>
      <div className="hero">
        <h1>
          Sharing a world of possibilities through books
        </h1>
      </div>
      <div className="howitworks">
        <div className="home-content">
          <h2 className="m-5">How it works</h2>
          <p>Some stuff</p>
        </div>
      </div>
      <footer>
        <p>some interesting footer content</p>

      </footer>
    </div>
    );
  }
}

export default HomeView;
