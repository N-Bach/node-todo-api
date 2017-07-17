const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'first todo'
  },
  {
    _id: new ObjectID(),
    text: 'second todo'
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('Should create new todo', done => {
    var text = 'eat cookie';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(err => done(e));
      });
  });

  it('Should not create todo with invalid input', done => {
    request(app).post('/todos').send({}).expect(400).end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find()
        .then(todos => {
          expect(todos.length).toBe(2);
          done();
        })
        .catch(err => {
          return done(err);
        });
    });
  });
});

describe('GET /todos', () => {
  it('Should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 if todo not found', done => {
    var HexId = new ObjectID().toHexString();
    request(app).get(`/todos/${HexId}`).expect(404).end(done);
  });

  it('Should return 404 for non-object id', done => {
    request(app).get('/todos/123dkeor').expect(404).end(done);
  });
});

describe('DELETE /todos:id', () => {
  it('should remove a todo', done => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId)
          .then(todo => {
            expect(todo).toNotExist();
            return done();
          })
          .catch(err => {
            return done(err);
          });
      });
  });
  it('should return 404 if todo not found', done => {
    var hexId = new ObjectID().toHexString();

    request(app).delete(`/todos/${hexId}`).expect(404).end(done);
  });

  it('should return 404 if ofjectid is not valid', done => {
    request(app).delete('/todos/1234j2ldkg').expect(404).end(done);
  });
});
