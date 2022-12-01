import fetch from "node-fetch";
import crypto from "crypto";
// Defining key
const secret = "aefc05467d";
const CPCODE = "AMHU6958",
  TIMESTAMP = parseInt(new Date().valueOf()) + "",
  TXNAMOUNT = "1000.0",
  MOBILENUMBER = "7036430358",
  TXN_REF_ID = "EPTXN061" + Date.now().toString().slice(0, 7);
const rawData = `${CPCODE}|${TIMESTAMP}|${TXNAMOUNT}|${MOBILENUMBER}|${TXN_REF_ID}`;
let hmac = crypto.createHmac("SHA512", Buffer.from("aefc05467d", "hex"));
//passing the data to be hashed
console.log(rawData);
const checksumData = hmac.update(rawData).digest("base64");
console.log("checksum : " + checksumData);

let url = `https://uat5yesmoney.easypay.co.in:5043/epyesbc/easypaygateway/v1?checksum=${checksumData}&cpcode=${CPCODE}&sscode=${TIMESTAMP}&amount=${TXNAMOUNT}&mobile=${MOBILENUMBER}
&txnid=${TXN_REF_ID}&returnUrl=https://google.com`;
console.log("url=> " + url);
