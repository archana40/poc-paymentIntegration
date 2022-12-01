const express = require("express");
const route = express.Router();
const { getPayUrl, initiateTransaction, getToken, getStatus, dataUpdate } = require("../utility/payment");


route.get("/", (req, res) => {
  res.send("welcome to payment integration");
});

//get-url
route.post("/easypay/get-payment-url", (req, res) => {
  const { userId, amount, planId } = req.body;
  const initiatedInfo =  initiateTransaction(userId, planId, amount);
  if (userId && planId && amount && initiatedInfo?.orderId) {
      let url = getPayUrl(initiatedInfo?.sscode, initiatedInfo?.orderId, amount);
      res.send({ url });
  }
  else {
    res.status(400).json({error : "bad request"})
  }
});

//get-access-token
route.post('/easypay/get-token', async (req, res) => {
  const { userName, password } = req.body;
  const accessInfo = await getToken(userName, password);
  if (userName && password) {
    res.status(200).json(accessInfo)  
  } else {
    res.status(400).json({ error : "bad request"})
  }
})

//status-check
route.post('/easypay/status-check', async (req, res) => {
const { mobile, orderId } = req.body;
const token = req.headers["authorization"].split(" ")[1]
const chk = await getStatus(mobile, orderId, token);
if (mobile && orderId && token) {
  res.status(200).json(chk);
}
else {
  res.status(400).json({error : "bad request"});
}
})

//update-transaction
route.post('/easypay/update-transaction', async (req, res) => {
  const statusInfo = await dataUpdate(req?.body);
  res.json(statusInfo);
})

module.exports = route;
