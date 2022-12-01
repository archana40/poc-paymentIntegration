const express = require("express");
const route = express.Router();
const { panDetails, gstDetails } = require('../utility/kyc');


route.get("/", (req, res) => {
  res.send("welcome to kyc integration");
});

route.post("/kyc-api/v1", async (req, res) => {
     const { pan, consent } = req.body;
     const panInfo = await panDetails(pan, consent);
    res.send(panInfo);
});

route.post("/kyc-api/v2", async (req, res) => {
     const { consent, gstin } = req.body;
     const gstInfo = await gstDetails(consent, gstin);
    res.send(gstInfo);
});


module.exports = route;
