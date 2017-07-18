const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const useroneId = new ObjectID();
const usertwoId = new ObjectID();
const users = [
  {
    _id: useroneId,
    email: 'hikaru@gmail.com',
    password: 'useronepass',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ access: 'auth', _id: useroneId }, 'abc123').toString()
      }
    ]
  },
  {
    _id: usertwoId,
    email: 'hide@gmail.com',
    password: 'usertwopass'
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'first todo'
  },
  {
    _id: new ObjectID(),
    text: 'second todo',
    completed: true,
    completedAt: 333
  }
];

const populateUsers = done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then(() => {
      done();
    });
  });
};

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
