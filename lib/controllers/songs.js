const { Router } = require('express');
const Song = require('../models/Song');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Song.getAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Song.getById(req.params.id));
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const song = await Song.insert(req.body);
    res.json(song);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Song.updateById(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
