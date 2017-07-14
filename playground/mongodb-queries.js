const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

var id = '159687990b28e7e7177e7e8f3';
var userId = '59684f9a268b8ad76c299033';

// if (!ObjectID.isValid()) {
//   console.log('ID is not valid');
// }

// Todo.find({
//   _id: id
// }).then(todos => {
//   console.log('todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('todo', todo);
// });

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('ID not found');
//     }
//     console.log('find by Id', todo);
//   })
//   .catch(err => {
//     console.log(err);
//   });

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log('User does not exist');
    }
    console.log('Here is the user', user);
  })
  .catch(err => {
    console.log(e);
  });
