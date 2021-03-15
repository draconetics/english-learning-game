const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

// database
const db = require('./config/db.js');

app.use(bodyParser.json());
// enabling cors
const cors = require('cors');

app.use(cors());

const wordsRoutes = require('./routes/words');
const sentencesRoutes = require('./routes/sentences');

app.use('/words', wordsRoutes); 
app.use('/sentences', sentencesRoutes); 
app.get('/sample', (res, req) => {
  console.log('get sample full');
  //res.status(200).json({ res: 'hello world' });
  res.send('hello word')
});

db.connect()
  .then(() => {
    console.log('database connected..');
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  });

module.exports = app;