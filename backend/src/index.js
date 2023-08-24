/* eslint-disable no-undef */

require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));

const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: process.env.VITE_RZP_KEY_ID,
  key_secret: process.env.VITE_RZP_KEY_SECRET,
});

app.get('/api/v1/rzp_capture/:payment_id/:amount', (req, res) => {
  const { payment_id } = req.params;
  const amount = Number(req.params.amount * 100);
  instance.payments
    .capture(payment_id, amount)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen('3000', () => console.log('Listening on port 3000'));
