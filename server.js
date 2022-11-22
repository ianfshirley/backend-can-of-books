'use strict';

// REQUIRE
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Book = require('./models/book');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());

//add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DATABASE_URL);

app.get('/books', getBooks);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Not available');
});

// ERROR
app.use((error, req, res) => {
  res.status(500).send(error.messgae);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
