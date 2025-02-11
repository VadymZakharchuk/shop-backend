const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')
const { findAll, findOne, create, update, destroy, login} = require("../controllers/users.controller");

router.get('/', verifyToken,
  async (req, res) => {
        const users = await findAll()
        res.json(users);
});

router.get('/:id', verifyToken,
  async (req, res) => {
        const user = await findOne(req.params.id)
        res.json(user)
});

router.post('/create',
  async (req, res) => {
        const user = await create(req.body)
        if (user.status === 200) user.data.save()
        res.status(user.status).json(user.data)
});

router.post('/login',
  async (req, res) => {
          const user = await login(req.body)
          if (user.status === 200) res.status(user.status).json(user.data)
          else res.status(500).json({ error: 'Login failed' })
  });


router.put('/:id', verifyToken,
  async (req, res) => {
        const user = await update(req.body,req.params.id)
        res.status(user.status).json(user.data)
});

router.delete('/:id', verifyToken,
  async (req, res) => {
        const user = await destroy(req.params.id)
        res.json(user)
});

module.exports = router;

