import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";

import { list as listBooks, search as searchBooksDb } from "../services/books";

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
      // console.log('PROPS: ', this.props);
      // console.log('BOOKS: ', this.state.books)
    } catch (error) {
      console.log(error);
    }
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    // const query = this.state.search;
    // const response = await listBooks(query);
    // const books = response.items;
    // this.setState({
    //   books
    // });
  };

  handleOnChange = e => {
    const name = e.target.name;
    const value = e.target.value.toLowerCase();
    const results = [...this.state.books].filter(book => book[name].toLowerCase().includes(value));
    this.setState({
      books: results
    });
  };

  render() {
    let books = [];
    if (this.props.user) {
      books = this.state.books.filter(
        book => book.seller !== this.props.user._id
      );
    } else {
      books = [...this.state.books];
    }

    // console.log('USER: ', this.props.user);
    console.log('state books: ', this.state.books);

    return (
      <Fragment>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Group>
            <Form.Control
              id="sell-title"
              type='text'
              placeholder='Enter Title'
              name="title"
              onChange={this.handleOnChange}
            />
            <Form.Control
              id="sell-autor"
              type='text'
              placeholder='Enter Author'
              name="author"
              onChange={this.handleOnChange}
            />
            <Form.Control
              id="sell-isbn"
              type='text'
              placeholder='Enter ISBN'
              name="isbn"
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Search
          </Button>
        </Form>

        {/* Links fiction / non-fiction */}

        <main style={{ display: "flex", flexWrap: "wrap" }}>
          {books.map(book => (
            <Card
              style={{ width: "24em", margin: "3em auto", padding: "1em" }}
              key={book._id}
            >
              <Card.Img variant='top' src={book.image} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text>{book.publishedYear}</Card.Text>
                <Card.Text>Listed on: {book.createdAt.slice(0, 10)}</Card.Text>
                <Button variant='primary' as={Link} to={`/book/${book._id}`}>
                  Buy
                </Button>
              </Card.Body>
            </Card>
          ))}
        </main>
      </Fragment>
    );
  }
}

export default BuyView;
