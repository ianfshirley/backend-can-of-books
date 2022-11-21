'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Book = require('./models/book');

const PORT = process.env.PORT || 3002;

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

app.get('/books', async (req, res) => {
  const filterQuery = {};
  if (req.query.title) {
    filterQuery.location = req.query.title;
  }
  const books = await Book.find(filterQuery);
  res.send(books);
});


app.get('/test', (request, response) => {

  response.send('test request received');

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
