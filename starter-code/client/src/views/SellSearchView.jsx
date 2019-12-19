import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { listBooks } from "./../services/googleBooks";

export default class SellSearchView extends Component {
  state = {
    search: "",
    books: []
  };

  handleOnSubmit = async e => {
    e.preventDefault();
    const query = this.state.search;
    const response = await listBooks(query);
    const books = response.items;
    this.setState({
      books
    });
  };

  handleOnChange = async e => {
    const value = e.target.value;
    this.setState({
      search: value
    });
    // console.log('this.state.search: ', this.state.search);
  };

  handleSellBook = async book => {
    // console.log(book);
    this.props.updateCurrentBook(book);
    // console.log(this.props);
    this.props.history.push("/book/sell");
  };

  render() {
    return (
      <div style={{ padding: "2em" }}>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Group controlId='search-sell'>
            {/* <Form.Label>I want to sell...</Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Enter Title / Author / ISBN'
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Search
          </Button>
          <p>or</p>
          <Link to='/book/sell/'>Enter manually</Link>
        </Form>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.books &&
            this.state.books.map(book => (
              <Card
                style={{ width: "18em", margin: "3em auto", padding: "1em" }}
                key={book.id}
              >
                <Card.Img
                  variant='top'
                  src={
                    book.volumeInfo.imageLinks
                      ? book.volumeInfo.imageLinks.thumbnail
                      : "https://res.cloudinary.com/dldcaigqm/image/upload/v1576515474/project-books/so8prbzxwsoxmqukzyd9.jpg"
                  }
                />
                <Card.Body className='card-body d-flex flex-column'>
                  <Card.Title className='text-center'>
                    {book.volumeInfo.title}
                  </Card.Title>
                  <Card.Text>
                    Year Published: {book.volumeInfo.publishedDate}
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    Author:{" "}
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.map(author => author + " ")}
                  </Card.Text>
                  <Button
                    variant='primary'
                    onClick={() => this.handleSellBook(book.volumeInfo)}
                  >
                    Sell this book
                  </Button>
                </Card.Body>
              </Card>
            ))}
            {this.state.books.length !== 0 && (
              <Link to='/book/sell/'>Enter manually</Link>
            )}
            
        </div>
      </div>
    );
  }
}
