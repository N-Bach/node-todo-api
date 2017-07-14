const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');
  }

  console.log('Connected to mongodb');

  // db
  //   .collection('Todos')
  //   .insertOne({ text: 'hello there', completed: false }, (err, result) => {
  //     if (err) {
  //       return console.log('unable to insert todo', err);
  //     }
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  //   });

  // db.collection('Users').insertOne({
  //   name: 'Hikaru',
  //   age: 23,
  //   location: 'Ho Chi Minh city'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Cannot insert to mongodb');
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.close();
});
