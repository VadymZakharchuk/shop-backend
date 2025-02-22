const express = require('express');
const router = express.Router();
const { findAll } = require("../controllers/sizes.controller");

router.get('/',
  async (req, res) => {
  const sizes = await findAll({
    where: req.query
  })
  res.json(sizes);
});

module.exports = router;