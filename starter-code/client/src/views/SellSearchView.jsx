import React, { Component } from "react";
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
    // console.log(this.state);
    const response = await listBooks(query);
    const books = response.items;
    this.setState({
      books
    });
    console.log("this.state.books: ", this.state.books);
  };

  handleOnChange = async e => {
    const value = e.target.value;
    this.setState({
      search: value
    });
    // console.log('this.state.search: ', this.state.search);
  };

  render() {
    return (
      <div style={{ padding: "2em" }}>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Group controlId='search-sell'>
            <Form.Label>I want to sell...</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Title / Author / ISBN'
              onChange={this.handleOnChange}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.books &&
            this.state.books.map(book => (
              <Card
                style={{ maxWidth: "18em", margin: "3em auto", padding: "1em" }}
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
                <Card.Body>
                  <Card.Title>{book.volumeInfo.title}</Card.Title>
                  <Card.Text>{book.volumeInfo.publishedDate}</Card.Text>
                  <Card.Text>
                    {book.volumeInfo.authors &&
                      book.volumeInfo.authors.map(author => author)}
                  </Card.Text>
                  <Button variant='primary'>Go somewhere</Button>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    );
  }
}
