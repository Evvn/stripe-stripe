import React from 'react'
import { injectStripe, CardElement } from 'react-stripe-elements'
import PaymentRequestForm from './PaymentRequest.js'
// import axios from 'axios'
// import PAYMENT_SERVER_URL from './constants/server';

//pk_test_gtRdjjtoOFsZqEvtkSD4sVir
//sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6

class CheckoutForm extends React.Component {
  // onSubmit = (ev) => {
  //   ev.preventDefault()
  //
  //   this.props.stripe.createToken({name: 'Evan Evan'}).then(({token}) => {
  //
  //     console.log('Received Stripe token:', token);
  //     // // use token to charge stripe
  //     // axios.post(PAYMENT_SERVER_URL,
  //     //  {
  //     //    source: token.id,
  //     //    currency: 'aud',
  //     //    amount: 1313
  //     //  })
  //     //  .then(console.log('success'))
  //     //  .catch(console.log('fail'))
  //
  //   })
  // }

  constructor(props) {
    super(props)

    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    ev.preventDefault()
    document.querySelector('button').classList.add('hidden')
    let {token} = await this.props.stripe.createToken({name: "Name :^)"});
    token.amount = parseFloat(document.querySelector('.amount').value.replace('.',''))
    token.desc = document.querySelector('.desc').value
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(token),
    });

    if (response.ok) {
      console.log("Purchase Complete!")
      document.querySelector('form').classList.add('hidden')
      document.querySelector('h3').classList.remove('hidden')
    }
  }

  render() {
    return(
      <form onSubmit={ this.submit }>
        <label>
          $$$
          <input className="amount" type="number" min="1" max="100" defaultValue="1.00" step="0.01"/>
        </label>

        <label>
          Description
          <input className="desc" type="text"/>
        </label>

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
