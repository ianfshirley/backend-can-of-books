'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book');
mongoose.connect(process.env.DATABASE_URL);

async function seed() {

  // await Book.create({
  //   title: 'The Way of Kings',
  //   description: 'A fantasy novel by Brandon Sanderson. Book 1 of The Stormligh Archive Series',
  //   status: '5 stars'
  // });
  // console.log('The Way of Kings was added to the DB');

  await Book.create({
    title: 'Trading for a Living',
    description: 'An instructional book about trading stocks.',
    status: '4 stars'
  });
  console.log('Trading for a Living');

  await Book.create({
    title: 'Unshakeable',
    description: 'A book about market corrections & psychology.',
    status: '5 stars'
  });
  console.log('Unshakeable');

  await Book.create({
    title: 'The Gathering Storm',
    description: 'A novel by Robert Jordan & Brandon Sanderson. Book 12 of The Wheel of Time series.',
    status: '4 stars'
  });
  console.log('The Gathering Storm');

  mongoose.disconnect();
}

seed();
