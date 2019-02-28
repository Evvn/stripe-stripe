import React from 'react'
import { Elements } from 'react-stripe-elements'
import InjectedCheckoutForm from './CheckoutForm.js'

class StripeForm extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedCheckoutForm/>
      </Elements>
    )
  }
}

export default StripeForm
