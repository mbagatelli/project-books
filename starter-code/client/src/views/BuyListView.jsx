import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { list as listBooks } from "../services/books";

export default class BuyListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
    };
  }

  async componentDidMount() {
    try {
      const books = await listBooks();
      if (this.props.user) {
        books.filter(book => book.seller !== this.props.user._id);
      }
      this.setState({
        books,
        results: books
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

  handleOnChange = async e => {
    const name = e.target.name;
    let value = e.target.value;
    if (typeof name !== "isbn") {
      value = value.toLowerCase();
    }
    if (value === '') {
      this.setState({
        ...this.state,
        results: this.state.books
      });
    } else {
      const results = [...this.state.books].filter(book => String(book[name]).toLowerCase().includes(value));
      this.setState({
        ...this.state,
        results
      });
    }
    console.log('Button pressed. Name: ', name, 'Value: ', value);
  };

  handleOnChangeIsFiction = async e => {
    const value = e.target.value.toLowerCase();
    if (value === '') {
      this.setState({
        ...this.state,
        results: this.state.books
      });
    } else {
      const results = [...this.state.books].filter(book => book.type === value);
        this.setState({
          ...this.state,
          results
        });
    }
  }

  render() {
    let results = [];
    if (this.props.user) {
      results = this.state.results.filter(
        book => book.seller !== this.props.user._id
      );
    } else {
      results = [...this.state.results];
    }
    // console.log('USER: ', this.props.user);
    // console.log('state books: ', this.state.books);
    // console.log(this.state);
    return (
      <Fragment>
        <Form>
          <Form.Group controlId='search-title'>
            <Form.Control
              name="title"
              type='text'
              placeholder='Enter Title'
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId='search-author'>
            <Form.Control
              name="author"
              type='text'
              placeholder='Enter Author'
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId='search-isbn'>
            <Form.Control
              name="isbn"
              type='text'
              placeholder='Enter ISBN'
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Button variant='primary' name="type" value="fiction" onClick={this.handleOnChangeIsFiction}>
            Fiction
          </Button>
          <Button variant='primary' name="type" value="non-fiction" onClick={this.handleOnChangeIsFiction}>
            Non-fiction
          </Button>
          <Button variant='primary' name="type" value="" onClick={this.handleOnChangeIsFiction}>
            All books
          </Button>
        </Form>

        <main style={{ display: "flex", flexWrap: "wrap" }}>
          {results.map(book => (
            <Card
              style={{ width: "18em", margin: "3em auto", padding: "1em" }}
              key={book._id}
            >
              <Card.Img variant='top' src={book.image} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>{book.author}</Card.Text>
                <Card.Text>{book.publishedYear}</Card.Text>
                <Card.Text>Listed on: {book.createdAt.slice(0, 10)}</Card.Text>
                <Button
                  className='mt-auto flex-wrap d-flex justify-content-center'
                  variant='primary'
                  as={Link}
                  to={`/book/${book._id}`}
                >
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
