const { Router } = require('express');
const Book = require('../models/book');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const list = await Book.getAll();
    res.json(list);
  } catch (error) {
    next(error.message);
  }
});
