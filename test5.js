var sha512 = require("js-sha512");

const hashingSecret = "aefc05467d";
const plainText = "AMHU6958|1668679397000|300.00|NA|zef1668679397000";

var hash2 = sha512.hmac.update(hashingSecret, plainText);
var hash = hash2.hex();
var chk = sha512.sha512.digest(hash, "base64");

console.log(chk);
