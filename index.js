const express = require('express');
const app = express();
const path = require('path');
const config = require('./config/database')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err) => {
  if(err) {
    console.log(`Could not connect to database: ${err}`);
  } else {
    console.log(`Connected to database`);
  }
});

app.use(express.static(__dirname + `/client/dist/client/`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + `/client/dist/client/index.html`));
});

// hhtp://localhost:8000/
app.listen(8000, () => {
  console.log('Server started on http://localhost:8000/');
})