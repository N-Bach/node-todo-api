const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var password = '123abc!';

// // bcrypt.genSalt(10, (err, salt) => {
// //   bcrypt.hash(password, salt, (err, hash) => {
// //     // console.log(hash);
// //   });
// // });

// var hashedPassword =
//   '$2a$10$45k0t5XSSc51yJJ6hFFTwO1Mik2uFMJzsdyct0jiFx7ucuDEjxk.a';

// bcrypt.compare(password, hashedPassword, (err, result) => {
//   console.log(result);
// });

var data = {
  id: '123'
};

console.log(jwt.sign(data, '123').toString());
