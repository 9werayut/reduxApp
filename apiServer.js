var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var Books = require('./models/books.js');

// ========= POST BOOKS ===========
app.post('/books', (req, res) => {
  var book = req.body;

  Books.create(book, (err, books) => {
    if(err){
      throw err;
    }
    res.json(books);
  });
});

// ========== GET BOOKS ============
app.get('/books', (req, res) => {
  Books.find((err, books) => {
    if(err) throw err;

    res.json(books);
  })
});

// ========== DELETE BOOKS =========
app.delete('/books/:_id', (req, res) => {

  let criteria = {_id: req.params._id}

  Books.remove(criteria, (err, books) => {
    if(err) throw err;

    res.json(books);
  })
});

// ========= UPDATE BOOKS ==========
app.put('/books/:_id', (req, res) => {
  let book = req.body;
  let criteria = req.params._id;
  
  //if the field doesn't exist $set will set a new field
  var update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  // when true returns the update document
  let options = {new: true};

  Books.findOneAndUpdate(criteria, update, options, (err, books) => {
    if(err) throw err;

    res.json(books);
  })
});

// END APIs

app.listen(3001, err => {
  if(err) return console.log(err);

  console.log('API Server is listening on http://localhost:3001')

})