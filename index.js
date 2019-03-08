const express = require("express")
const stripe = require("stripe")("sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6")

const path = require('path')
const app = express()

// app.use(require("body-parser").text());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')))

app.post("/charge", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount,
      currency: "aud",
      description: req.body.desc,
      source: req.body.id
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// app.listen(1313, () => console.log("Listening on port 1313 :)"));
const port = process.env.PORT || 1313;
app.listen(port)
console.log(`Stripe stripe stripe on port ${port}`);
