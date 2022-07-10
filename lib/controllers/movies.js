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

router.get('/:id', async (req, res, next) => {
  try {
    const movie = await Movie.getById(req.params.id);
    res.json(movie);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const movie = await Movie.insert(req.body);
    res.json(movie);
  } catch (e) {
    next(e);
  }
});
module.exports = router;
