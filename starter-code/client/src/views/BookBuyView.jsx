import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Collapse, Form, Col } from "react-bootstrap";
import { load as loadBookService } from "./../services/books";
import { sellerBuyNotification } from "./../services/notifications";

export default class BookBuyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isCollapsed: false,
      fullName: null,
      address: null
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.handleRequestBook = this.handleRequestBook.bind(this);
  }

  async componentDidMount() {
    this.setState({
      ...this.state,
      fullName: this.props.user.fullName,
      address: this.props.user.address
    });
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

  handleFormSubmit(e) {
    this.toggleCollapse();
    e.preventDefault();
    // console.log('DELIVERY ADDRESS: ', this.state.fullName, this.state.address);
    // console.log('BOOK IN STATE: ', this.state.book);
  }

  handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  handleRequestBook() {
    sellerBuyNotification(
      this.state.book._id,
      this.state.fullName,
      this.state.address
    );
    // this.props.updateReceiver(this.state.fullName, this.state.address);
  }

  toggleCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }

  render() {
    const book = this.state.book;
    // console.log("name: ", this.state.fullName, "\naddress: ", this.state.address);
    //const user = this.props.user;
    // let fullName = user.fullName.slice();
    // let address = user.address.slice();
    return (
      <div>
        <h1 className='d-flex justify-content-center m-3'>Confirm Exchange</h1>

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
            <Card.Text className='m-3'>
              <span className='font-weight-bold'>Price in coins</span>
              <br /> {book.price}
            </Card.Text>
          </Card.Body>
        </Card>

        <Collapse in={!this.state.isCollapsed}>
          <Card.Text className='m-3' id='address'>
            <span className='font-weight-bold'>
              Confirm Your Delivery Address
            </span>
            <br />
            {this.state.fullName}
            <br />
            {this.state.address}><br />
          </Card.Text>
        </Collapse>
        <Collapse in={this.state.isCollapsed}>
          <Card.Text className='m-3' id='address'>
            {/* <span className='font-weight-bold'>THIS WILL EDIT</span><br /> */}
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='fullName'
                    placeholder={this.state.fullName}
                    onChange={this.handleOnChange}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='text'
                    name='address'
                    placeholder={this.state.address}
                    onChange={this.handleOnChange}
                  />
                </Form.Group>
              </Form.Row>

              <Button variant='danger' type='submit'>
                Confirm
              </Button>
            </Form>
          </Card.Text>
        </Collapse>

        <Button
          variant='secondary'
          className='m-3'
          onClick={() => this.toggleCollapse()}
          aria-controls='address'
          aria-expanded={this.state.isCollapsed}
        >
          Edit Address
        </Button>

        <Button
          onClick={this.handleRequestBook}
          className='mt-5 m-3 mx-auto flex-wrap d-flex justify-content-center shadow w-25'
          variant='primary'
          as={Link}
          to={'/buy/confirmation'}
        >
          Exchange
        </Button>
      </div>
    );
  }
}
