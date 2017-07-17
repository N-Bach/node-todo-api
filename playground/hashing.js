const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 5,
  foo: 'foo'
};

var token = jwt.sign(data, '123abc');
var decoded = jwt.verify(token, '123abc');
console.log(`Token ${token}`);
// console.log(`Verify ${decoded}`);
console.log(decoded);
