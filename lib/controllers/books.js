const { Router } = require('express');
const Book = require('../models/book');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getBookById(1);
      res.json(book);
    } catch (error) {
      next(error.message);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const list = await Book.getAll();
      res.json(list);
    } catch (error) {
      next(error.message);
    }
  });
