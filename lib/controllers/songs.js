const { Router } = require('express');
const Song = require('../models/Song');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.send(await Song.getAll());
  } catch (e) {
    next(e);
  }
});

module.exports = router;
