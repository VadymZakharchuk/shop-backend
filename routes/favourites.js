const express = require('express');
const router = express.Router();
const { findAll } = require("../controllers/favourites.controller");

router.get('/', async (req, res) => {
  const lang = req.headers['accept-language'] || ''
  const userId = req.query.userId
  const categories = await findAll(lang, userId)
  res.json(categories);
});

module.exports = router;