import React, { Component } from 'react';
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
    console.log('PROPS: ', this.props);
    return (
      <div>
        <h1>Confirm Purchase</h1>
        
        <h2>Item: {book.title}</h2>

        <p>Condition: {book.condition}</p>
        <p>Price: {book.price}</p>

      </div>
    )
  }
}
