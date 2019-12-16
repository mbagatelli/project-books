import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

import {
  load as loadBookService,
  edit as editBookService,
  remove as removeBookService
} from "./../services/books";

class BookEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.onDeleteTrigger = this.onDeleteTrigger.bind(this);
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log("book id", id);
    try {
      const book = await loadBookService(id);
      this.setState({
        book
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "genre") {
      this.setState({
        book: {
          ...this.state.book,
          [name]: value,
          genre: [...this.state.book.genre, value]
        }
      });
    } else {
      this.setState({
        book: {
          ...this.state.book,
          [name]: value
        }
      });
    }
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const book = this.state.book;
    const id = this.props.match.params.id;
    try {
      await editBookService(id, book);
      this.props.history.push(`/book/buy`);
    } catch (error) {
      console.log(error);
    }
  }

  async onDeleteTrigger() {
    const id = this.props.match.params.id;
    try {
      await removeBookService(id);
      this.props.history.push(`/`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const book = this.state.book;
    return (
      <Fragment>
        {book && (
          <Form onSubmit={this.handleFormSubmission}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name='title'
                type='text'
                value={book.title}
                placeholder='Enter the book title...'
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='author'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                value={book.author}
                placeholder='Enter the author...'
                name='author'
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='isbn'>
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type='text'
                name='isbn'
                value={book.isbn}
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='synopsis'>
              <Form.Label /* className='Label' why?*/>Synopsis</Form.Label>
              <Form.Control
                type='text'
                label='Enter a short summary..'
                value={book.synopsis}
                name='synopsis'
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId='type' onChange={this.handleInputChange}>
              <Form.Check
                id='fiction'
                inline
                type='radio'
                label='Fiction'
                name='type'
                value='fiction'
                defaultChecked={book.type === "fiction"}
              />
              <Form.Check
                id='non-fiction'
                inline
                type='radio'
                label='Non-Fiction'
                name='type'
                value='non-fiction'
                defaultChecked={book.type === "non-fiction"}
              />
            </Form.Group>

            {/* Genres */}
            <p>Genre</p>
            <Form.Group controlId='genre' onChange={this.handleInputChange}>
              {[
                "Action and adventure",
                "Art",
                "Alternate history",
                "Autobiography",
                "Anthology",
                "Biography",
                "Chick lit",
                "Book review",
                "Children's",
                "Cookbook",
                "Comedy",
                "Comic book",
                "Diary",
                "Coming-of-age",
                "Dictionary",
                "Crime",
                "Encyclopedia",
                "Drama",
                "Guide",
                "Fairytale",
                "Health",
                "Fantasy",
                "History",
                "Graphic novel",
                "Journal",
                "Historical fiction",
                "Math",
                "Horror",
                "Memoir",
                "Mystery",
                "Prayer",
                "Paranormal",
                "Religion, spirituality, and new age",
                "Picture book",
                "Textbook",
                "Poetry",
                "Review",
                "Political",
                "Science",
                "Romance",
                "Self help",
                "Satire",
                "Travel",
                "Science fiction",
                "True crime",
                "Short story",
                "Suspense",
                "Thriller",
                "Young adult"
              ].map(genre => (
                <Form.Check
                  key={genre}
                  id={`genre-${genre}`}
                  //checked={book.genre === genre}
                  type='checkbox'
                  label={genre}
                  name='genre'
                  value={genre}
                />
              ))}
            </Form.Group>

            <p>Language</p>
            <Form.Group controlId='language' onChange={this.handleInputChange}>
              <Form.Check
                defaultChecked={book.language === "English"}
                id='english'
                inline
                type='radio'
                label='English'
                name='language'
                value='English'
              />
              <Form.Check
                defaultChecked={book.language === "Português"}
                id='português'
                inline
                type='radio'
                label='Português'
                name='language'
                value='Português'
              />
              <Form.Check
                defaultChecked={book.language === "Français"}
                id='français'
                inline
                type='radio'
                label='Français'
                name='language'
                value='Français'
              />
              <Form.Check
                defaultChecked={book.language === "Deutsch"}
                id='deutsch'
                inline
                type='radio'
                label='Deutsch'
                name='language'
                value='Deutsch'
              />
              <Form.Check
                defaultChecked={book.language === "Esperanto"}
                id='esperanto'
                inline
                type='radio'
                label='Esperanto'
                name='language'
                value='Esperanto'
              />
              <Form.Check
                defaultChecked={book.language === "Polski"}
                id='polski'
                inline
                type='radio'
                label='Polski'
                name='language'
                value='Polski'
              />
              <Form.Check
                defaultChecked={book.language === "Español"}
                id='español'
                inline
                type='radio'
                label='Español'
                name='language'
                value='Español'
              />
              <Form.Check
                defaultChecked={book.language === "Italiano"}
                id='italiano'
                inline
                type='radio'
                label='Italiano'
                name='language'
                value='Italiano'
              />
              <Form.Check
                defaultChecked={book.language === "русский язык"}
                id='русский язык'
                inline
                type='radio'
                label='русский язык'
                name='language'
                value='русский язык'
              />
              <Form.Check
                defaultChecked={book.language === "普通話"}
                id='普通話'
                inline
                type='radio'
                label='普通話'
                name='language'
                value='普通話'
              />
              <Form.Check
                defaultChecked={book.language === "日本語"}
                id='日本語'
                inline
                type='radio'
                label='日本語'
                name='language'
                value='日本語'
              />
              <Form.Check
                defaultChecked={book.language === "Other language"}
                id='language-other'
                inline
                type='radio'
                label='Other language'
                name='language'
                value='Other language'
              />
              {/* <Form.Control name="language" type="text" placeholder="Other language.." onChange={this.handleInputChange} /> */}
            </Form.Group>

            <Form.Group controlId='publishedYear'>
              <Form.Control
                type='number'
                placeholder='Published year...'
                value={book.publishedYear}
                name='publishedYear'
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId='condition' onChange={this.handleInputChange}>
              {["Very good", "Good", "Okay"].map(condition => (
                <Form.Check
                  key={condition}
                  id={`condition-${condition}`}
                  type='radio'
                  defaultChecked={book.condition === condition}
                  label={condition}
                  name='condition'
                  value={condition}
                />
              ))}
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type='number'
                placeholder='Cost in coins'
                name='price'
                value={book.price}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Enter short description (optional)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Description...'
                name='description'
                value={book.description}
                onChange={this.handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Book Cover photo:</Form.Label>
              <br />
              <img src={book.image} alt='' />
              <br />
              <input
                type='file'
                name='image'
                onChange={this.handleFileChange}
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Edit Book
            </Button>
            <Button onClick={this.onDeleteTrigger}>Delete Book</Button>
          </Form>
        )}
      </Fragment>
    );
  }
}

export default BookEditView;
