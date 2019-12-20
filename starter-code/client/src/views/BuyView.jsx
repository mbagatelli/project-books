import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { load as loadBookService } from "./../services/books";

export default class BuyView extends Component {
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
    }
  }
  
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
  
  render() {
    const book = this.state.book;
    const type = book.type.split('').reduce((accumulator, currentValue, index) => {
      if (index === 0) {
        return currentValue.toUpperCase();
      } else {
        return accumulator += currentValue;
      }
    }, '');
    // console.log(book);

    return (
      <Card
        style={{maxWidth: '90vw'}} className="mt-3 mx-auto mb-3"
        key={book._id}
      >
        <Card.Img variant='top' src={book.image} style={{ maxWidth: "18em"}} className="mx-auto shadow mt-3"/>
        <Card.Body>
          <div className="text-center mb-5">
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <Card.Text>{book.publishedYear}</Card.Text>
          </div>
          <Card.Text><span className="font-weight-bold">{type}</span></Card.Text>
          <Card.Text><span className="font-weight-bold">Synopsis</span> <br />{book.synopsis}</Card.Text>
          <Card.Text><span className="font-weight-bold">Condition</span> <br />{book.condition}</Card.Text>
          <Card.Text><span className="font-weight-bold">Price</span> <br />{book.price}</Card.Text>
          <Card.Text><span className="font-weight-bold">Seller description</span><br/> {book.description}</Card.Text>
          <Button
            className='mx-auto flex-wrap d-flex justify-content-center shadow w-25'
            variant='primary'
            as={Link}
            to={`/buy/confirmation/${book._id}`}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    )
  }
}
