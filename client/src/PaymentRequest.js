import React from 'react'
import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements'

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    let paymentRequest = props.stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: 'fail',
        amount: 100,
      },
    });

    paymentRequest.on('click', () => {
      document.querySelector('body').classList.add('red')
      paymentRequest.update({
        total: {
          label: this.props.desc,
          amount: this.props.amount,
        }
      })
    })

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

  onClick = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.add('red')
    this.state.paymentRequest.update(
      {
        label: this.props.desc,
        amount: this.props.amount,
      }
    )
    this.state.paymentRequest()
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        click={ this.onClick }
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
