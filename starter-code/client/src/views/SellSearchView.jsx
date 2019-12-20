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
        <Form
          onSubmit={this.handleOnSubmit}
          className='d-flex flex-column align-items-center'
        >
          <Form.Group controlId='search-sell'>
            {/* <Form.Label>I want to sell...</Form.Label> */}
            <Form.Control
              type='text'
              placeholder='Enter Title / Author / ISBN'
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='m-3 shadow'>
            Search
          </Button>
          <p>or</p>
          <Link className='btn btn-primary shadow' to='/book/sell/'>
            Enter manually
          </Link>
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
                <Card.Body className='d-flex flex-column justify-content-end'>
                  <Card.Title className='text-center'>
                    {book.volumeInfo.title}
                  </Card.Title>
                  <Card.Text className='text-center'>
                    Year Published:{" "}
                    {book.volumeInfo.publishedDate
                      ? book.volumeInfo.publishedDate.slice(0, 4)
                      : ""}
                  </Card.Text>
                  <Card.Text className='text-center mb-4'>
                    Author:{" "}
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.map(author => author + " ")}
                  </Card.Text>
                  <Button
                    className='flex-wrap d-flex justify-content-center'
                    variant='primary'
                    onClick={() => this.handleSellBook(book.volumeInfo)}
                  >
                    Sell this book
                  </Button>
                </Card.Body>
              </Card>
            ))}
        </div>
        {this.state.books.length !== 0 && (
          <Link to='/book/sell/'>Enter manually</Link>
        )}
      </div>
    );
  }
}
