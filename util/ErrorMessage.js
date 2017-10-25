const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, '../config/message.json');
const message = JSON.parse(fs.readFileSync(filePath,'utf8'));

const ErrorMessage = {};

ErrorMessage.getMessage = function(code){
  return message[code] || "error server";
};

module.exports = ErrorMessage