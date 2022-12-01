// const { request } = require("express");
// const crypto = require("crypto");
// import fetch from "node-fetch";

// const hashingSecret = "aefc05467d";
// const plainText = "AMHU6958|1668679397000|300.00|NA|zef1668679397000";

// const hashedStr = crypto
//   .createHmac("sha512", hashingSecret)
//   .update(plainText)
//   .digest("base64");

//const crypto = require("crypto");
// // Defining key
// const secret = "aefc05467d";
// const CPCODE = "AMHU6958",
//   TIMESTAMP = parseInt(new Date().valueOf()) + "",
//   TXNAMOUNT = "1000.0",
//   MOBILENUMBER = "NA",
//   TXN_REF_ID = "EPTXN061" + Date.now().toString().slice(0, 7);
// const rawData = `${CPCODE}|${TIMESTAMP}|${TXNAMOUNT}|${MOBILENUMBER}|${TXN_REF_ID}`;
// let hmac = crypto.createHmac("SHA512", Buffer.from("aefc05467d", "hex"));
//passing the data to be hashed
//console.log(rawData);
// const checksumData = hmac.update(rawData).digest("base64");
// console.log("checksum : " + checksumData);

// let url = `https://uat5yesmoney.easypay.co.in:5043/epyesbc/easypaygateway/v1?checksum=${checksumData}&cpcode=${CPCODE}&sscode=${TIMESTAMP}&amount=${TXNAMOUNT}&mobile=${MOBILENUMBER}
// &txnid=${TXN_REF_ID}&returnUrl=https://google.com`;
// console.log("url=> " + url);
