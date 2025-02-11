const express = require('express');
const router = express.Router();
const { findAll } = require("../controllers/categories.controller");

router.get('/', async (req, res) => {
  const lang = req.headers['accept-language'] || ''

  const categories = await findAll(lang)
  res.json(categories);
});

module.exports = router;