import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Collapse } from "react-bootstrap";
import { load as loadBookService } from "./../services/books";

export default class BookBuyView extends Component {
  state = {
    book: {
      title: "",
      author: "",
      isbn: "",
      synopsis: "",
      type: "",
      genre: [],
      language: "",
      publishedYear: 0,
      condition: "",
      price: 0,
      description: "",
      image: null
    },
    isCollapsed: false
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const book = await loadBookService(id);
      this.setState({
        book
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  toggleCollapse = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  render() {
    const book = this.state.book;
    console.log("PROPS: ", this.props);
    const user = this.props.user;
    return (
      <div>
        <h1 className="d-flex justify-content-center m-3">Confirm Exchange</h1>

        <Card
          style={{ maxWidth: "90vw" }}
          className='mt-3 mx-auto mb-3'
          key={book._id}
        >
          <Card.Img
            variant='top'
            src={book.image}
            style={{ maxWidth: "5em" }}
            className='mx-auto shadow mt-3'
          />
          <Card.Body>
            <div className='text-center mb-5'>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.author}</Card.Text>
              <Card.Text>{book.publishedYear}</Card.Text>
            </div>
            <Card.Text className="m-3">
              <span className='font-weight-bold'>Price in coins</span><br /> {book.price}
            </Card.Text>
            <Collapse in={!this.state.isCollapsed}>
              <Card.Text className="m-3" id="address">
                <span className='font-weight-bold'>Confirm Your Delivery Address</span><br />
                {user.fullName}<br />
                {user.address}><br />
              </Card.Text>
            </Collapse>
            <Collapse in={this.state.isCollapsed}>
              <Card.Text className="m-3" id="address">
                <span className='font-weight-bold'>THIS WILL EDIT</span><br />
                <Form onClick={this.handleFormSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Address</Form.Label>
                      <Form.Control value={user.address} />
                    </Form.Group>
                  </Form.Row>

                  <Button variant="danger">Confirm</Button>
                </Form>
                {user.fullName}<br />
                {user.address}><br />
              </Card.Text>
            </Collapse>

            <Button variant="secondary" className="mt-4" onClick={() => this.toggleCollapse()}
              aria-controls="address"
              aria-expanded={this.state.isCollapsed}
            >
              Edit Address
            </Button>
            <Button
              className='mt-5 m-3 mx-auto flex-wrap d-flex justify-content-center shadow w-25'
              variant='primary'
              as={Link}
              to={`/buy/${book._id}`}
            >
              Buy
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
