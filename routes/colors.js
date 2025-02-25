const express = require('express');
const router = express.Router();
const { findAll } = require("../controllers/colors.controller");

router.get('/',
  async (req, res) => {
  const colors = await findAll({
    where: req.query
  })
  res.json(colors);
});

module.exports = router;