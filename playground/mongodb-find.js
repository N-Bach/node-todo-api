const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDb server');
  }

  console.log('Connected to mongodb');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5968360a58a59fa1a429304a')
  // }).toArray().then(
  //   docs => {
  //     console.log('Todos');
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   },
  //   err => {
  //     console.log('Unable to fetch data from database');
  //   }
  // );
  db.collection('Todos').find().count().then(
    count => {
      console.log('Count', count);
    },
    err => {
      console.log('Unable to count data from database');
    }
  );

  // db.close();
});