import React, { Component } from "react";
import "./HomeView.css";
import { Link } from "react-router-dom";

class HomeView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='home'>
        <div className='hero'>
          <h1>Sharing a world of possibilities through books</h1>
        </div>
        <div className='mission'>
          <div className='home-content'>
            <h2 className='m-5'>Books are expensive.</h2>
            <p>
              For many people books are just too expensive and others have books
              collecting dust on shelves.
            </p>
            <p className='mt-5'>What if we could change that?</p>
          </div>
        </div>
        <div className='howitworks'>
          <div className='home-content'>
            <h2 className='m-5'>How it works</h2>
            <p>
              <Link to='/user/sign-up'>Sign up</Link> to the site and
              <Link to='/book/sell'> sell</Link> your first book!
            </p>
            <p>
              You will receive coins each time you make a sale then
              <br />
              you can spend your coins exchanging other users' books.
            </p>
          </div>
          <p className='mt-5'>
            <u>Share</u> your knowledge!
          </p>
          <p className='m-3 mt-5'>Now sure what to read?</p>
          <p>
            Check out <a href='https://mind-scape.herokuapp.com/'>MindScape</a>
          </p>
        </div>
      </div>
    );
  }
}

export default HomeView;
