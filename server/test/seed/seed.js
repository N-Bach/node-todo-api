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
        token: jwt
          .sign({ access: 'auth', _id: useroneId }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  },
  {
    _id: usertwoId,
    email: 'hide@gmail.com',
    password: 'usertwopass',
    tokens: [
      {
        access: 'auth',
        token: jwt
          .sign({ access: 'auth', _id: usertwoId }, process.env.JWT_SECRET)
          .toString()
      }
    ]
  }
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'first todo',
    _creator: useroneId
  },
  {
    _id: new ObjectID(),
    text: 'second todo',
    completed: true,
    completedAt: 333,
    _creator: usertwoId
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
