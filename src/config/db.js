const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/c06-english';

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const { Mockgoose } = require('mockgoose');
      const mockgoose = new Mockgoose(mongoose);

      console.log('!!test mode.');

      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    } else {
      connectToDataBase(resolve, reject);
    }
  });// end promise
}

function connectToDataBase(resolve, reject) {
  mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => resolve())
    .catch((err) => reject(err));
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };