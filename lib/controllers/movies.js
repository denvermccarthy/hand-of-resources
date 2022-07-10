const { Router } = require('express');
const Movie = require('../models/Movie');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const movies = await Movie.getAll();
    res.json(movies);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
