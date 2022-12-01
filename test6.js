var SHA512 = require("crypto-js/sha512");
var CryptoJS = require("crypto-js");

const hashingSecret = "aefc05467d";
const plainText = "AMHU6958|1668679397000|300.00|NA|zef1668679397000";

//console.log(CryptoJS.HmacSHA512(plainText, hashingSecret));
const hmacDigest = Base64.stringify(hmacSHA512(hashingSecret));
