import React, { Component, Fragment } from "react";
import { Form, Button, Collapse } from "react-bootstrap";

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
// const langList = [
//   "en",
//   "pt",
//   "fr",
//   "de",
//   "eo",
//   "pl",
//   "ru",
//   "zh",
//   "ja",
//   "Other language"
// ];

export default class SellView extends Component {
  constructor(props) {
    super(props);
    let user = null;
    if (this.props.user) {
      user = this.props.user._id;
    }
    this.state = {
      book: {
        title: "",
        author: "",
        isbn: "",
        synopsis: "",
        type: "",
        seller: user,
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
    this.toggleCollapse = this.toggleCollapse.bind(this);
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
      // const lang = langList.filter(lang => lang === book.language);
      const bookImage = book.imageLinks
        ? book.imageLinks.thumbnail
        : "https://res.cloudinary.com/dldcaigqm/image/upload/v1576515474/project-books/so8prbzxwsoxmqukzyd9.jpg";
      let year;
      if (book.publishedDate) {
        year = Number(book.publishedDate.slice(0, 4));
      }
      let isbnObj = "";
      if (
        book.industryIdentifiers &&
        book.industryIdentifiers.find(
          identifier => identifier.type === "ISBN_13"
        )
      ) {
        isbnObj = book.industryIdentifiers.find(
          identifier => identifier.type === "ISBN_13"
        );
        isbnObj = isbnObj.identifier;
        console.log("ISBN OBJ: ", isbnObj);
      }
      console.log("BOOK PROP: ", book);
      this.setState({
        book: {
          ...this.state.book,
          image: bookImage,
          publishedYear: null || year,
          seller: this.props.user._id,
          type: "" || fictionNonfiction,
          synopsis: "" || book.description,
          isbn: "" || isbnObj,
          author: "" || authors,
          title: "" || book.title
          // genre: [] || genres,
          // language: lang || "Other language",
        },
        isCollapsed: true
      });
    }
    window.scrollTo(0, 0);
    let coll = document.getElementsByClassName("collapsible");
    let i = 0;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
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
    if (this.state.book.genre) {
      genres = [...this.state.book.genre];
    }
    if (genres && genres.indexOf(value) !== -1) {
      const index = genres.indexOf(value);
      genres.splice(index, 1);
      this.setState({
        book: {
          ...this.state.book.genres,
          genre: genres
        }
      });
    } else if (genres && name === "genre") {
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
  }

  handleFileChange(event) {
    // const defaultPhoto =
    //   "https://res.cloudinary.com/dldcaigqm/image/upload/v1576515474/project-books/so8prbzxwsoxmqukzyd9.jpg";
    const file = event.target.files[0];
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

  toggleCollapse() {
    this.setState({
      isCollapsed: !this.state.isCollapsed
    });
  }
  render() {
    console.log("This state book: ", this.state.book);
    // const [open, setOpen] = useState(false);
    return (
      <Fragment className='mx-auto text-center'>
        <Form className='container mt-3' onSubmit={this.handleFormSubmit}>
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
          <p className='collapsible'>Open Genre</p>
          <div className='content'>
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
          </div>
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
            {/*  <Form.Label>Change picture</Form.Label>
              <input
              style={fileInputButton}
              type='file'
              name='image'
              onChange={this.handleFileChange}
            />
            <Button variant='outline-danger' onClick={this.removeImage}>
              Remove image
            </Button> */}
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Fragment>
    );
  }
}

/* const fileInputButton = {
  // color: 'transparent',
  content: "Select a files",
  color: "black",
  display: "inline-block",
  background: "-webkit-linear-gradient(top, #f9f9f9, #e3e3e3)",
  border: "1px solid #999",
  borderRadius: "0.3em",
  padding: "0.2em 0.2em 0.2em 0.2em",
  outline: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textShadow: "1px 1px #fff",
  // fontWeight: '600'
  margin: "1em"
}; */
