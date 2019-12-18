import React, { Component } from "react";
import { Link } from "react-router-dom";

import { list as listBooks } from "./../services/books";

class BuyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  async componentDidMount() {
    try {
      const books = await listBooks();
      if (this.props.user) {
        books.filter(book => book.seller !== this.props.user._id);
      }
      this.setState({
        books
      });
      console.log('PROPS: ', this.props);
      console.log('BOOKS: ', this.state.books)
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main>
        {this.state.books.map(book => (
          <Link key={book._id} to={`/book/${book._id}`}>
            <h1>{book.title}</h1>
          </Link>
        ))}
      </main>
    );
  }
}

export default BuyView;
