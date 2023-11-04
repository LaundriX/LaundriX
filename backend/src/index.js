/* eslint-disable no-undef */

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const razorpay = new Razorpay({
  key_id: process.env.VITE_RZP_KEY_ID,
  key_secret: process.env.VITE_RZP_KEY_SECRET,
});

app.post('/verification', (req, res) => {
  const secret = process.env.VITE_VERIFICATION_SECRET;
  console.log(req.body);

  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (digest === req.headers['x-razorpay-signature']) {
    console.log('request is legit');
    // REDIRECT TO SUMMARY PAGE

    res.json({ status: 'ok' }).status(200);
  } else {
    res.status(401);
    throw new Error('not authorized!');
    //  TAKE BACK TO CHECKOUT PAGE
  }
});
app.post('/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = 500;
  const currency = 'INR';

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res
      .status(200)
      .json({ id: response.id, currency: 'INR', amount: response.amount });
  } catch (error) {
    console.log(error);
  }
});

app.listen('3000', () => console.log('Listening on port 3000'));
