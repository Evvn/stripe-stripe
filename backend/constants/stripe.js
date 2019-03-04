const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6'
    : 'sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
