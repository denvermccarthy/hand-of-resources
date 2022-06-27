const { Router } = require('express');
const Artist = require('../middleware/Artist');
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
module.exports = router;
