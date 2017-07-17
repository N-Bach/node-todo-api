const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findByIdAndRemove('596c1f2a58a59fa1a429473e').then(todo => {
  console.log(todo);
});
