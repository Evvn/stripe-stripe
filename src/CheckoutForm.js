import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import PaymentRequestForm from './PaymentRequest.js'
const stripe = require("stripe")("sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6")

class CheckoutForm extends React.Component {
  onSubmit = (ev) => {
    ev.preventDefault()

    this.props.stripe.createToken({name: 'Evan Evan'}).then(({token}) => {

      console.log('Received Stripe token:', token);
      // charge 'token' with stripe
      (async () => {
        const charge = await stripe.charges.create({
          amount: 131313,
          currency: 'aud',
          description: 'Example chargeExample chargeExample chargeExample charge',
          source: token,
        })
      })()

    })
  }

  render() {
    return(
      <form onSubmit={ this.onSubmit }>
        <label>
          Card details
          <CardElement />
        </label>

        <button>Send it</button>

        <label>
          Payment Request (if available)
          <PaymentRequestForm />
        </label>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)
