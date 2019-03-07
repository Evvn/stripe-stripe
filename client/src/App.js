import React, {Component} from 'react';
import './App.css';
// import StripeBtn from './StripeBtn.js'
import StripeForm from './StripeForm.js'
import { StripeProvider } from 'react-stripe-elements'

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_gtRdjjtoOFsZqEvtkSD4sVir">
        <div className="App">
          <h1>Stripe</h1>
          <h1>Stripe</h1>
          <h1>Stripe</h1>
          <h1>Stripe</h1>
          <h1>Stripe</h1>
          <h3 className="hidden">Payment success</h3>

          {/* <StripeBtn /> */}

          <StripeForm />

        </div>
      </StripeProvider>
    );
  }
}

export default App;
