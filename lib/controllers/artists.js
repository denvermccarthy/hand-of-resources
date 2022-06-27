const { Router } = require('express');
const Artist = require('../models/Artist');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    res.json(await Artist.getAll());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    res.json(await Artist.getById(req.params.id));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    res.json(await Artist.insert(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Artist.deleteById(req.params.id);
    res.json({ message: 'Successfully deleted' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    res.json(await Artist.updateById(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
});
module.exports = router;
