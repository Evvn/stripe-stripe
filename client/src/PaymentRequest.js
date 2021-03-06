import React from 'react'
import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements'

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.amount);
    console.log(this.props.desc);

    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    let paymentRequest = props.stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: 'why',
        amount: 1313,
      },
    });

    // paymentRequest.on('click', (e) => {
    //   document.querySelector('body').classList.add('red')
    //   e.updateWith({
    //     total: {
    //       label: this.props.desc,
    //       amount: this.props.amount,
    //     }
    //   })
    // })

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then((result) => {
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          // For more details on how to style the Payment Request Button, see:
          // https://stripe.com/docs/elements/payment-request-button#styling-the-element
          paymentRequestButton: {
            theme: 'dark',
            height: '64px',
          },
        }}
      />
    ) : null
  }
}

export default injectStripe(PaymentRequestForm);
