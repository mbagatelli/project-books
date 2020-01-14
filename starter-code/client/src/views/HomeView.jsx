import React, { Component } from "react";
import "./HomeView.css";
import { Link } from "react-router-dom";

class HomeView extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home">
        <div className="hero">
          <h1>Sharing a world of possibilities through books</h1>
        </div>
        <div className="mission">
          <div className="home-content">
            <h2 className="m-5">Books are expensive.</h2>
            <p>
              For many people books are just too expensive and others have books
              collecting dust on shelves.
            </p>
            <p className="mt-5">What if we could change that?</p>
          </div>
        </div>
        <div className="howitworks mt-0">
          <div className="home-content mt-0 pt-0">
            <h2 className="mr-3 ml-3 mb-5 mt-0">How it works</h2>
            <p className="m-0">
              List a book<br />
              Send a book<br />
              Receive coins<br />
              Spend coins
            </p>
            <p>Magic</p>
            <p>
              <Link to="/user/sign-up">Sign up</Link> to the site and
              <Link to="/book/sell"> sell</Link> your first book!
            </p>
            <p>
              Haven't got a book to trade? We've got you covered: You can buy
              coins. Sorted.
            </p>
            <p>
              Not sure what to read?
              <br />
              Check out{" "}
              <a href="https://mind-scape.herokuapp.com/">MindScape</a>
            </p>
            <Link to="/book/buylist" type="button" class="btn btn-primary mt-3">
              See Books
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeView;
