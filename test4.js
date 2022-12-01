var crypto = require("crypto");
const hashingSecret = "aefc05467d";
const plainText = "AMHU6958|1668679397000|300.00|NA|zef1668679397000";

var hash = crypto
  .createHmac("SHA512", "hashingSecret")
  .update("plainText")
  .digest("base64");
console.log(hash);
