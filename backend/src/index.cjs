const express=require('express')
const Razorpay=require('razorpay')
const shortid = require("shortid");
const cors=require('cors')

const app = express();

app.use(cors())

const razorpay = new Razorpay({
  key_id: "rzp_test_fOPnnCL2pBt7Bz",
  key_secret: "vMK5xInrAfLOO7VBncNVDqOZ",
});
app.post("/CheckoutPage/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 5000;

  const options = {
    amount: amount,
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture,
  };

  try{
  const response = await razorpay.orders.create(options);
  console.log(response)
  res.json({
    id:response.id,
    currency:'INR',
    amount:response.amount,
  })
  }catch(error){
    console.log(error)
  }
});
app.listen(8000, () => {
  console.log("server running");
});
