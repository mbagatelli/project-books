import React, { Component, Fragment } from "react";
import { Form, Button } from "react-bootstrap";

import { create as createBook } from "../services/books";

const bookGenres = [
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
  "Literary Criticism",
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
];
const langList = [
  "en",
  "pt",
  "fr",
  "de",
  "eo",
  "pl",
  "ru",
  "zh",
  "ja",
  "Other language"
];

export default class SellView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        title: "",
        author: "",
        isbn: "",
        synopsis: "",
        type: "",
        seller: this.props.user._id,
        genre: [],
        language: "",
        publishedYear: 0,
        condition: "",
        price: 0,
        description: "",
        image: null
      }
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  componentDidMount() {
    // console.log("SellView -- this.props: ", this.props);
    if (this.props.book) {
      const book = this.props.book;
      let authors;
      if (book.authors) {
        authors = book.authors.map(author => {
          if (book.authors.length > 1) {
            return " " + author;
          } else {
            return author;
          }
        });
      }
      let fictionNonfiction = "";
      if (book.categories && "non" in book.categories[0].toLowerCase) {
        fictionNonfiction = "non-fiction";
      }
      // const genres = bookGenres.filter(genre => genre in bookGenres);
      const lang = langList.filter(lang => lang === book.language);
      const bookImage = book.imageLinks
        ? book.imageLinks.thumbnail
        : "https://res.cloudinary.com/dldcaigqm/image/upload/v1576515474/project-books/so8prbzxwsoxmqukzyd9.jpg";
      let year;
      if (book.publishedDate) {
        year = Number(book.publishedDate.slice(0, 4));
      }
      let isbnObj;
      if (book.industryIdentifiers) {
        isbnObj = book.industryIdentifiers.find(identifier => identifier.type === 'ISBN_13');
      }
      console.log('BOOK PROP: ', book);
      this.setState({
        book: {
          title: "" || book.title,
          author: "" || authors,
          isbn: "" || isbnObj.identifier,
          synopsis: "" || book.description,
          type: "" || fictionNonfiction,
          seller: this.props.user._id,
          // genre: [] || genres,
          language: lang || "Other language",
          publishedYear: null || year,
          image: bookImage
        }
      });
    }
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const book = this.state.book;
    try {
      await createBook(book);
      this.props.history.push(`/user/profile`);
    } catch (error) {
      console.log(error);
    }
  }

  /* User should go to his profile or edit the book?
  /*   async handleFormSubmit(event) {
    event.preventDefault();
    const book = this.state.book;
    try {
      const bookDocument = await createBook(book);
      const id = bookDocument._id;
      this.props.history.push(`/user/${id}`);
    } catch (error) {
      console.log(error);
    }
  } */

  handleInputChange(event) {
    //console.log(this.props);
    // console.log('This state: ', this.state);
    // console.log('EVENT TARGET: ', event.target);
    const value = event.target.value;
    const name = event.target.name;
    let genres;
    if (this.state.book.genre !== []) {
      genres = [...this.state.book.genre]
    } else {
      genres = [];
    }
    if (genres.indexOf(value) !== -1) {
      const index = genres.indexOf(value);
      genres.splice(index, 1);
      this.setState({
        book: {
          ...this.state.book.genres,
          genre: genres
        }
      });
    } else if (name === "genre") {
      this.setState({
        book: {
          ...this.state.book,
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
  };

  handleFileChange(event) {
    // const defaultPhoto =
    //   "https://res.cloudinary.com/dldcaigqm/image/upload/v1576515474/project-books/so8prbzxwsoxmqukzyd9.jpg";
    const file = event.target.files[0]
    this.setState({
      book: {
        ...this.state.book,
        image: file
      }
    });
  }
  
  removeImage() {
    this.setState({
      book: {
        ...this.book,
        image: null
      }
    });
  }

  render() {
    // console.log("This state book: ", this.state.book);
    return (
      <Fragment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              name='title'
              type='text'
              required
              placeholder='Enter the book title...'
              value={this.state.book.title}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type='text'
              required
              placeholder='Enter the author...'
              name='author'
              value={this.state.book.author}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='isbn'>
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type='text'
              name='isbn'
              value={this.state.book.isbn}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='synopsis'>
            <Form.Label /* className='Label' why?*/>Synopsis</Form.Label>
            <Form.Control
              as='textarea'
              rows='3'
              type='text'
              label='Enter a short summary..'
              name='synopsis'
              value={this.state.book.synopsis}
              onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='type' onChange={this.handleInputChange}>
            <Form.Check
              id='fiction'
              inline
              required
              type='radio'
              label='Fiction'
              name='type'
              value='fiction'
            />
            <Form.Check
              id='non-fiction'
              inline
              type='radio'
              label='Non-Fiction'
              name='type'
              value='non-fiction'
            />
          </Form.Group>

          {/* Genres */}
          <p>Genre</p>
          <Form.Group controlId='genre' onChange={this.handleInputChange}>
            {bookGenres.map(genre => (
              <Form.Check
                key={genre}
                id={`genre-${genre}`}
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
              id='english'
              inline
              required
              type='radio'
              label='English'
              name='language'
              value='en'
            />
            <Form.Check
              id='português'
              inline
              type='radio'
              label='Português'
              name='language'
              value='pt'
            />
            <Form.Check
              id='français'
              inline
              type='radio'
              label='Français'
              name='language'
              value='fr'
            />
            <Form.Check
              id='deutsch'
              inline
              type='radio'
              label='Deutsch'
              name='language'
              value='de'
            />
            <Form.Check
              id='esperanto'
              inline
              type='radio'
              label='Esperanto'
              name='language'
              value='eo'
            />
            <Form.Check
              id='polski'
              inline
              type='radio'
              label='Polski'
              name='language'
              value='pl'
            />
            <Form.Check
              id='español'
              inline
              type='radio'
              label='Español'
              name='language'
              value='es'
            />
            <Form.Check
              id='italiano'
              inline
              type='radio'
              label='Italiano'
              name='language'
              value='it'
            />
            <Form.Check
              id='русский язык'
              inline
              type='radio'
              label='русский язык'
              name='language'
              value='ru'
            />
            <Form.Check
              id='普通話'
              inline
              type='radio'
              label='普通話'
              name='language'
              value='zh'
            />
            <Form.Check
              id='日本語'
              inline
              type='radio'
              label='日本語'
              name='language'
              value='ja'
            />
            <Form.Check
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
              value={this.state.book.publishedYear}
              placeholder='Published year...'
              name='publishedYear'
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId='condition' onChange={this.handleInputChange}>
            {["Very good", "Good", "Okay"].map(condition => (
              <Form.Check
                key={condition}
                required
                id={`condition-${condition}`}
                type='radio'
                label={condition}
                name='condition'
                value={condition}
              />
            ))}
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Control
              type='number'
              placeholder='Cost in coins'
              required
              name='price'
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId='description'>
            {/* <Form.Label>Enter short description (optional)</Form.Label> */}
            <Form.Control
              as='textarea'
              rows='3'
              type='text'
              placeholder='Enter short description...'
              required
              name='description'
              onChange={this.handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId='image'>
            <img src={this.state.book.image} alt='' />
            <Form.Label>Change cover picture</Form.Label>
            <input type='file' name='image' onChange={this.handleFileChange} />
            <Button variant='danger' onClick={this.removeImage}>Remove image</Button>
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}
