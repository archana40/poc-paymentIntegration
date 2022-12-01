const { request } = require("express");
const sha512 = require("js-sha512");
const crypto = require("crypto");

let sec = "AMHU6958|1668679397000|300.00|NA|zef1668679397000";

// require("crypto").createHash("sha512").update(hex).digest("hex");

//  let hash = crypto.createHash("sha512");
//  hash.update(aefc05467d + sec);

let hex = sha512.sha512.hex(sec);

// let sigCheck = code.digest("base64");
// let hash1 = sha512.hex(sigCheck);

//console.log(hex);
