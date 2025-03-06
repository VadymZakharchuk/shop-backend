const express = require('express');
const router = express.Router();
const { findAll, newOrderNo } = require("../controllers/orders.controller");

router.get('/',
  async (req, res) => {
  const orders = await findAll({
    where: req.query
  })
  res.json(orders);
});

router.get('/new',
  async (req, res) => {
    const maxOrder = await newOrderNo()
    res.json(maxOrder[0]);
  })

module.exports = router;