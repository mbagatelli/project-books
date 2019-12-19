import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { stripe as stripeService } from "../services/stripe";

export class StripeCheckoutView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        coins: this.props.user.coins
      },
      product: {
        name: "coins",
        price: 10
      }
    };
    this.handleToken = this.handleToken.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    console.log(value);
    this.setState({
      product: {
        name: "coins",
        price: value
      }
    });
  }

  //need to add coins for the user
  async handleToken(token) {
    const product = this.state.product;
    try {
      const status = await stripeService(token, product);
      console.log(status, token, product);
      if (status === "success") {
        this.setState({
          user: {
            coins: product.coins
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props.user.coins, this.state.product);
    return (
      <div>
        <h1>how many coins?</h1>
        <input
          type='number'
          name='price'
          value={this.state.product.price}
          onChange={this.handleInputChange}
        />
        <br />
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={this.handleToken}
          amount={this.state.product.price * 100}
          name='Tesla Roadster'
          billingAddress
          shippingAddress
        />
      </div>
    );
  }
}

export default StripeCheckoutView;
