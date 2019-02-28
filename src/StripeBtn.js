import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
  onToken = (token) => {
    console.log(token);
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    return (
      <StripeCheckout
        name="Stripe Stripe Stripe" // head
        description="That's stripe three times" // subhead
        image="/stripe.png" // image
        panelLabel="Place order"
        amount={ 1313 } // cents
        token={this.onToken}
        currency="AUD"
        locale="en"
        stripeKey="pk_test_gtRdjjtoOFsZqEvtkSD4sVir"
        ComponentClass="div"
      />
    )
  }
}
