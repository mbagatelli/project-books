import React, { Component } from 'react'
import { Form, Button} from 'react-bootstrap';
import { listBooks } from './../services/googleBooks';

export default class SellSearchView extends Component {
  state = {
    search: ''
  }
  
  handleOnSubmit = async (e) => {
    e.preventDefault();
    const query = this.state.search;
    // console.log(this.state);
    const response = await listBooks(query);
    console.log(response);
  }

  handleOnChange = async (e) => {
    const value = e.target.value;
    this.setState({
      search: value
    });
    console.log('this.state.search: ', this.state.search);
  }
  
  render() {
    return (
      <div>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Group controlId="search-sell">
            <Form.Label>I want to sell...</Form.Label>
            <Form.Control type="text" placeholder="Enter Title / Author / ISBN" onChange={this.handleOnChange}/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
