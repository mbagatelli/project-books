import React, { Component, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SellView extends Component {
  state = {
    title: '',
    author: '',
    synopsis: '',
    type: '',
    genre: [],
    language: '',
    price: 0
  }
  
  handleFormSubmit = event => {
    event.preventDefault()
    console.log(this.state);
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    console.log(event.target);
    if (name === 'genre') {
      this.setState({
        genre: [...this.state.genre, value]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  }

  // genre,
  // language,
  // pushlished_year,
  // price,
  // image
  render() {
    return (
      <Fragment>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" type="text" placeholder="Enter the book title..." onChange={this.handleInputChange}/>
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter the author..." name="author" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="isbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control type="text" name="isbn" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="synopsis">
            <Form className="Label">Synopsis</Form>
            <Form.Control type="text" label="Enter a short summary.." name="synopsis" onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="type" onChange={this.handleInputChange}>
            <Form.Check id="fiction" inline type="radio" label="Fiction" name="type" value="fiction" />
            <Form.Check id="non-fiction" inline type="radio" label="Non-Fiction" name="type" value="non-fiction" />
          </Form.Group>
          
          {/* Genres */}
          <p>Genre</p>
          <Form.Group controlId="type" onChange={this.handleInputChange}>
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
          ].map(genre => <Form.Check id={`genre-${genre}`} type="checkbox" label={genre} name="genre" value={genre} /> )}
          </Form.Group>

          <p>Language</p>
          <Form.Group controlId="language" onChange={this.handleInputChange}>
            <Form.Check id="english" inline type="radio" label="English" name="language" value="English" />
            <Form.Check id="português" inline type="radio" label="Português" name="language" value="Português" />
            <Form.Check id="français" inline type="radio" label="Français" name="language" value="Français" />
            <Form.Check id="deutsch" inline type="radio" label="Deutsch" name="language" value="Deutsch" />
            <Form.Check id="esperanto" inline type="radio" label="Esperanto" name="language" value="Esperanto" />
            <Form.Check id="polski" inline type="radio" label="Polski" name="language" value="Polski" />
            <Form.Check id="español" inline type="radio" label="Español" name="language" value="Español" />
            <Form.Check id="italiano" inline type="radio" label="Italiano" name="language" value="Italiano" />
            <Form.Check id="русский язык" inline type="radio" label="русский язык" name="language" value="русский язык" />
            <Form.Check id="普通話" inline type="radio" label="普通話" name="language" value="普通話" />
            <Form.Check id="日本語" inline type="radio" label="日本語" name="language" value="日本語" />
            <Form.Check id="language-other" inline type="radio" label="Other language" name="language" value="Other language" />
            {/* <Form.Control name="language" type="text" placeholder="Other language.." onChange={this.handleInputChange} /> */}
          </Form.Group>

          <Form.Group controlId="published_year">
            <Form.Control type="number" placeholder="Published year..." name="published_year" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="type" onChange={this.handleInputChange}>
          {[ 'very good', 'good', 'okay' ].map(condition => <Form.Check id={`condition-${condition}`} type="radio" label={condition} name="condition" value={condition} /> )}
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Control type="number" placeholder="Cost in coins" name="price" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="description">
            {/* <Form.Label>Enter short description (optional)</Form.Label> */}
            <Form.Control type="text" placeholder="Enter short description (optional)..." name="description" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image input will go here</Form.Label>
            {/* <Form.Control type="number" placeholder="Cost in coins" name="price" onChange={this.handleInputChange} /> */}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Fragment>
    )
  }
}
