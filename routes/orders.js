const express = require('express');
const router = express.Router();
const { findAll, newOrderNo, create } = require("../controllers/orders.controller");

router.get('/',
  async (req, res) => {
  const orders = await findAll({
    where: req.query,
    include: ['product', 'user', 'status'],
  })
  res.json(orders);
});

router.get('/new',
  async (req, res) => {
    const maxOrder = await newOrderNo()
    res.json(maxOrder[0]);
  })

router.post('/create',
  async (req, res) => {
    const order = await create(req.body);
    res.json(order);
})

module.exports = router;