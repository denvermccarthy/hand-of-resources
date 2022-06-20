const { Router } = require('express');
const Album = require('../models/Album');

const router = Router();

router.get('/', async (req, res, next) => {
  const response = await Album.getAlbums();

  res.send(response);
});

module.exports = router;
