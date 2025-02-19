const express = require('express');
const router = express.Router();
const { findAll, add, remove } = require("../controllers/favourites.controller");

router.get('/',
  async (req, res) => {
  const lang = req.headers['accept-language'] || ''
  const userId = req.query.userId
  const favourites = await findAll(lang, userId)
  res.json(favourites);
});

router.post('/',
  async (req, res) => {
  const lang = req.headers['accept-language'] || ''
  const favourites = await add(req.body)
  res.json(favourites);
});

router.delete('/',
  async (req, res) => {
  const favourites = await remove(req.body)
  res.json(favourites);
});

module.exports = router;