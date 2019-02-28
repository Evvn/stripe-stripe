import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import PaymentRequestForm from './PaymentRequest.js'

class CheckoutForm extends React.Component {
  onSubmit = (ev) => {
    ev.preventDefault()

    this.props.stripe.createToken({name: 'Evan Evan'}).then(({token}) => {
      console.log('Received Stripe token:', token);
    })
  }

  render() {
    return(
      <form onSubmit={ this.onSubmit }>
        <label>
          Card details
          <CardElement />
        </label>

        <label>
          Payment Request
          <PaymentRequestForm />
        </label>

        <button>Send it</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
