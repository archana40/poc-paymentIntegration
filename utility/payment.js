const crypto = require("crypto");
const fetch = require("node-fetch");
const db = require("../model/db");
const axios = require('axios');
require("dotenv").config();
const ENV = process?.env

 function initiateTransaction(userId, planId, amount) {
  sscode = parseInt(new Date().valueOf());
  orderId = "EPTXN061" + sscode;
  const initiated = db.Subscriptions.create({
    userId,
    planId,
    amount,
    sscode,
    orderId,
  });
  if (initiated) {
    return { sscode, orderId };
  } else {
    return {};
  }
}

function getPayUrl(sscode, orderId, amount, mobile="7877678767") {
  const secretKey = ENV?.EPSECRET;
  const CPCODE = ENV?.CPCODE;
  const MOBILENUMBER = mobile;
  const rawData = `${CPCODE}|${sscode}|${amount}|${MOBILENUMBER}|${orderId}`;
  let hmac = crypto.createHmac("SHA512", Buffer.from(secretKey, "hex"));
  //passing the data to be hashed
  const checksumData = hmac.update(rawData).digest("base64");
  let url = `https://uat5yesmoney.easypay.co.in:5043/epyesbc/easypaygateway/v1?checksum=${checksumData}&cpcode=${CPCODE}&sscode=${sscode}&amount=${amount}&mobile=${MOBILENUMBER}&txnid=${orderId}&returnUrl=${ENV?.EPRETURN_URL}`;
  return url;
}

async function getToken(username, password) {
  try {
     var auth = 'Basic ' + new Buffer.from(username + ':' + password).toString('base64');
     var hash = {'Authorization': auth};
     var hashing = hash.Authorization;
     var config = {
     method: 'post',
     url: 'https://uat5yesmoney.easypay.co.in:5043/epMoney/oauth/token?grant_type=client_credentials',
     headers: { 
       'Content-Type': 'application/json', 
       'Authorization': hashing
        }
    };
    let res = await axios(config)
    let data = res.data;
    return data
  } catch (error) {
    console.log(error);
    return null
  }
}

async function getStatus(mobile, orderId, token) {
  try {
         var data = JSON.stringify({
              "CUSTOMER_MOBILE": mobile,
              "REQUEST_REFERENCE_NO": orderId,
              "CPCODE": ENV?.CPCODE
              });
        var config = {
              method: 'post',
              url: 'https://uat5yesmoney.easypay.co.in:5043/epMoney/transaction-status/gateway/v1.0/',
             headers: { 
                   'Content-Type': 'application/json', 
                   'Authorization': `Bearer ${token}`
                 },
             data : data
          };
        let read = await axios(config)
        let reqStatus = read.data
        console.log({reqStatus});
        if(reqStatus?.RESP_CODE==='200'){
          updateResult = await dataUpdate({ 
          TXN_STATUS:reqStatus?.DATA?.TRANSACTION_STATUS,
          RESP_MSG:reqStatus?.DATA?.TRANSACTION_STATUSMESSAGE,
          RES_CODE:reqStatus?.RESP_CODE,
          RRN:reqStatus?.DATA?.REQUEST_REFERENCE_NO })
          return updateResult
        }else{
          return reqStatus
        }      
  } catch (error) {
    console.log(error);
    return {}
  }
}

async function dataUpdate(updateResult ) {
  try {
    const updateDetails = {
      status:updateResult?.TXN_STATUS,
      message: updateResult?.RESP_MSG,
      resCode: updateResult?.RES_CODE,
      rrn: updateResult?.RRN
    }
    const updatedData = await db.Subscriptions?.update(updateDetails, { where: { orderId:updateResult?.RRN } });
    console.log({updatedData});
    if(updatedData[0]===1){
    return {
      "RESP_CODE": 300,
      "RESPONSE": "Success",
      "RESP_MSG": "Status Updated Successfully"
    }
    }else{
      return {
          "RESP_CODE": 302,
          "RESPONSE": "Failed",
          "RESP_MSG": "Transaction Failed"
        }
    }
  } catch (error) {
     return {
          "RESP_CODE": 302,
          "RESPONSE": "Failed",
          "RESP_MSG": "Transaction Failed"
        }
  }
} 

module.exports = { getPayUrl, initiateTransaction, getToken, getStatus, dataUpdate };
