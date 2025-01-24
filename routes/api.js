/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require("../models");

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      try {
        const books = await Book.find({});
        if (!books) {
          return res.json([]);
        }

        const formatData = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            comments: book.comments,
            commentcount: book.comments.length
          }
        });
        return res.json(formatData);
      }catch (err) {
        console.log(err);
        res.json([]);
      }
    })
    
    .post(async function (req, res){
      let title = req.body.title;
      if (!title) {
        res.send("missing required field title");
        return;
      }
      
      const newBook = new Book({ title, comments: [] });
      try {
        const book = await newBook.save();
        res.json({ _id: book._id, title: book.title });
      } catch (err) {
        console.log(err);
        res.send("there was an error saving");
      }
    })
    
    .delete(async function(req, res){
      try {
        const deleteAllBooks = await Book.deleteMany({});
        res.send("complete delete successful");
      }catch (err) {
        console.log(err);
        res.json({ error: "Internal server error" });
      }
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      let bookId = req.params.id;
      const foundBook = await Book.findOne({ _id: bookId });
      if (!foundBook) {
        return res.send("no book exists");
      }

      res.json(foundBook);
    })
    
    .post(async function(req, res){
      let bookId = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment) {
        res.send("missing required field comment");
        return;
      }

      try {
        let book = await Book.findById(bookId);
        book.comments.push(comment);
        book = await book.save();
        res.json({
          _id: book._id,
          title: book.title,
          comments: book.comments
        });
      }catch (err) {
        res.send("no book exists");
      }
    })
    
    .delete(async function(req, res){
      let bookId = req.params.id;
      try {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
          return res.send("no book exists");
        }
        return res.send("delete successful");
      }catch (err) {
        console.log(err);
        return res.send("no book exists");
      }
    });
  
};
