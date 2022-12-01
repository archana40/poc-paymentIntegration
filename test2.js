//Name of the file : sha512-hash.js
//Loading the crypto module in node.js
var crypto = require("crypto");
const { sha512 } = require("js-sha512");
//creating hash object
var hash = crypto.createHash("sha512");
//passing the data to be hashed
// var data = hash.update(
//   "AMHU6958|1668679397000|300.00|NA|zef1668679397000",
//   "text"
// );

data = hash.update(
  "aefc05467d" + "AMHU6958|1668679397000|300.00|NA|zef1668679397000",
  "utf-8"
);

//Creating the hash in the required format
//gen_hash = data.digest("hex");
let gen_hash = data.sha512.hex(hash);
let sigCheck = gen_hash.digest("base64");

//Printing the output on the console
console.log("hash : " + sigCheck);
