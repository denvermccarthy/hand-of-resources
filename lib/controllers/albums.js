const { Router } = require('express');
const Album = require('../models/Album');

const router = Router();
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
