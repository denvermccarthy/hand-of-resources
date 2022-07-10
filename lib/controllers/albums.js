const { Router } = require('express');
const Album = require('../models/Album');

const router = Router();
router.post('/', async (req, res, next) => {
  const { title, year_released } = req.body;
  if (!title || !year_released) {
    res.send({ message: 'Please provide a valid input' }).sendStatus(400);
  }
  try {
    const response = await Album.insertAlbum(req.body);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const response = await Album.updateAlbumById(req.params.id, req.body);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const response = await Album.deleteById(req.params.id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await Album.getAlbumById(req.params.id);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const response = await Album.getAlbums();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
