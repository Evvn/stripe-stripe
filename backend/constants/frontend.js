const FRONTEND_DEV_URLS = [ 'https://localhost:3000' ];

const FRONTEND_PROD_URLS = [
  'https://stripe-stripe.herokuapp.com'
];

module.exports = process.env.NODE_ENV === 'production'
  ? FRONTEND_PROD_URLS
  : FRONTEND_DEV_URLS;
