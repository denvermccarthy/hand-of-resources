const { Router } = require('express');
const Book = require('../models/book');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const deleted = await Book.deleteById(req.params.id);
      res.send(deleted);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const book = await Book.updateBookById(req.params.id, req.body);
      res.json(book);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insertBook(req.body);
      res.json(book);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getBookById(1);
      res.json(book);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const list = await Book.getAll();
      res.json(list);
    } catch (error) {
      next(error);
    }
  });
