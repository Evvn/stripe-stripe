import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import PaymentRequestForm from './PaymentRequest.js'
import axios from 'axios'
import PAYMENT_SERVER_URL from './constants/server';

//pk_test_gtRdjjtoOFsZqEvtkSD4sVir
//sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6

class CheckoutForm extends React.Component {
  onSubmit = (ev) => {
    ev.preventDefault()

    console.log(PAYMENT_SERVER_URL);

    this.props.stripe.createToken({name: 'Evan Evan'}).then(({token}) => {

      console.log('Received Stripe token:', token);
      // use token to charge stripe
      axios.post(PAYMENT_SERVER_URL,
       {
         source: token.id,
         currency: 'aud',
         amount: 1313
       })
       .then(console.log('success'))
       .catch(console.log('fail'))

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
