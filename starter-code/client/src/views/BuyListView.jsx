import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import { list as listBooks } from "../services/books";

export default class BuyListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: []
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
    if (name !== "isbn") {
      value = value.toLowerCase();
    }
    if (value === "") {
      this.setState({
        ...this.state,
        results: this.state.books
      });
    } else {
      const results = [...this.state.books].filter(book =>
        String(book[name])
          .toLowerCase()
          .includes(value)
      );
      this.setState({
        ...this.state,
        results
      });
    }
    console.log("Button pressed. Name: ", name, "Value: ", value);
  };

  handleOnChangeIsFiction = async e => {
    const value = e.target.value.toLowerCase();
    if (value === "") {
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
  };

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
        <Form className='container mt-3'>
          <Form.Group controlId='search-title'>
            <Form.Control
              name='title'
              type='text'
              placeholder='Enter Title'
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId='search-author'>
            <Form.Control
              name='author'
              type='text'
              placeholder='Enter Author'
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <Form.Group controlId='search-isbn'>
            <Form.Control
              name='isbn'
              type='text'
              placeholder='Enter ISBN'
              onChange={this.handleOnChange}
            />
          </Form.Group>
          <div className='col-md-4 text-center'>
            <Button
              className='mr-1'
              variant='primary'
              name='type'
              value='fiction'
              onClick={this.handleOnChangeIsFiction}
            >
              Fiction
            </Button>
            <Button
              className='mr-1'
              variant='primary'
              name='type'
              value='non-fiction'
              onClick={this.handleOnChangeIsFiction}
            >
              Non-fiction
            </Button>
            <Button
              variant='primary'
              name='type'
              value=''
              onClick={this.handleOnChangeIsFiction}
            >
              All books
            </Button>
          </div>
          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Language
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item name="language" value="" onClick={this.handleOnChange}>Show all</Dropdown.Item>
              <Dropdown.Item name="language" value="en" onClick={this.handleOnChange}>English</Dropdown.Item>
              <Dropdown.Item name="language" value="pt" onClick={this.handleOnChange}>Portuguese</Dropdown.Item>
              <Dropdown.Item name="language" value="fr" onClick={this.handleOnChange}>French</Dropdown.Item>
              <Dropdown.Item name="language" value="de" onClick={this.handleOnChange}>German</Dropdown.Item>
              <Dropdown.Item name="language" value="eo" onClick={this.handleOnChange}>Esperanto</Dropdown.Item>
              <Dropdown.Item name="language" value="it" onClick={this.handleOnChange}>Italian</Dropdown.Item>
              <Dropdown.Item name="language" value="zh" onClick={this.handleOnChange}>Chinese</Dropdown.Item>
              <Dropdown.Item name="language" value="ja" onClick={this.handleOnChange}>Japanese</Dropdown.Item>
              <Dropdown.Item name="language" value="ru" onClick={this.handleOnChange}>Russian</Dropdown.Item>
              <Dropdown.Item name="language" value="Other language" onClick={this.handleOnChange}>Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Form>

        <main style={{ display: "flex", flexWrap: "wrap" }}>
          {results.map(book => (
            <Card
              style={{ width: "18em", margin: "3em auto", padding: "1em" }}
              key={book._id}
            >
              <Card.Img variant='top' src={book.image} />
              <Card.Body className='d-flex flex-column justify-content-end'>
                <Card.Title className='text-center'>{book.title}</Card.Title>
                <Card.Text className='text-center'>
                  Author: {book.author}
                </Card.Text>
                <Card.Text className='text-center'>
                  Published Year: {book.publishedYear}
                </Card.Text>
                <Card.Text className='text-center mb-4'>
                  Listed on: {book.createdAt.slice(0, 10)}
                </Card.Text>
                <Button
                  className='flex-wrap d-flex justify-content-center'
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
