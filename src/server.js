const app = require("express")();
const stripe = require("stripe")("sk_test_PvFxZtS5rhJLoPfqZ6fjT4f6");

// app.use(require("body-parser").text());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.listen(9000, () => console.log("Listening on port 9000 :)"));
