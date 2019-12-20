import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { stripe as stripeService } from "../services/stripe";
import { edit as editCoin } from "../services/auth";

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
      if (status === "success") {
        console.log("Success", this.props.user._id, this.state.product.price);
        const coins = Number(this.props.user.coins) + Number(this.state.product.price);
        await editCoin(this.props.user._id, { coins: coins});
        this.setState({
          user: this.state.user
        });
        this.props.updateUser();
        // console.log('USER STATE: ', this.state.user);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props.user.coins, this.state.product);
    return (
      <div className='howitworks-stripe'>
        <div className='home-content'>
          <h2 className='m-5'>Add Coins to your wallet!</h2>
          <div className='form-group'>
            <label htmlFor='coins'></label>
            <input
              type='number'
              placeholder='Amount of coins'
              name='coins'
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <StripeCheckout
          className='m-3'
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={this.handleToken}
          amount={this.state.product.price * 100}
          name='The Book Cellar'
          billingAddress
          shippingAddress
        />
      </div>
    );
  }
}

export default StripeCheckoutView;
