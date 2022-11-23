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
app.use(express.json());

//add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DATABASE_URL);

app.get('/books', getBooks);
app.post('/books', postBooks);
//path parameter is a variable that we declare in the path
// app.delete('/books:id', deleteBooks);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}
async function postBooks(req, res, next) {
  try {
    console.log(req.body);
    let newBook = await Book.create(req.body);
    res.send(newBook);
  } catch(err) {
    next(err);
  }
}
app.get('*', (req, res) => {
  res.status(404).send('Not available');
});

// ERROR
app.use((req, res, error) => {
  res.status(500).send(error.messgae);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
