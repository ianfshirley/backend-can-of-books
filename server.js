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
app.post('/books', postBook);
// Path Parameter — a variable that we declare in the path
// ex URL:
// http://localhost:3001/cats/637bceabc57c693faee21e8f
// I can access the value 637bceabc57c693faee21e8f with:
// req.params.id
app.delete('/books/:id', deleteBook);
app.put('/books/:id', putBook);

async function getBooks(req, res, next) {
  try {
    let results = await Book.find();
    res.status(200).send(results);
  } catch(err) {
    next(err);
  }
}
async function postBook(req, res, next) {
  try {
    console.log(req.body);
    let newBook = await Book.create(req.body);
    res.send(newBook);
  } catch(err) {
    next(err);
  }
}
async function deleteBook(req, res, next) {
  try {
    // get the ID of the book we want to delete
    // console.log(req.params.id);
    await Book.findByIdAndDelete(req.params.id);
    res.send('book deleted');
  } catch(err) {
    next(err);
  }
}
async function putBook(req, res, next) {
  try {
    let id = req.params.id;
    let updatedBookData = req.body;
    // findByIdAndUpdate() takes 3 params:
    // 1. ID of the thing to update
    // 2. the updated data object
    // 3. an options object (replace the entire thing in the DB with this new thing)
    let updatedBook = await Book.findByIdAndUpdate(id, updatedBookData, { new: true, overwrites: true });
    res.status(200).send(updatedBook);
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
