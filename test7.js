var CryptoJS = require("crypto-js");
const hashingSecret = "aefc05467d";
const plainText = "AMHU6958|1668679397000|300.00|NA|zef1668679397000";

var hash = CryptoJS.HmacSHA512(plainText, hashingSecret);
var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

console.log(hashInBase64);
