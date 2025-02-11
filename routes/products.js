const express = require('express');
const { findAll, create, update } = require("../controllers/products.controller");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/',
  async (req, res) => {
    const lang = req.headers['accept-language'] || 'en'
    const excludeList = lang === 'en' ? ['name_en', 'description_en'] : ['name_uk', 'description_uk']
    if (req.query.id) {
        const products = await findAll({
            attributes: { exclude: excludeList },
            where: { id: req.query.id },
            include: ['category', 'colors']
        });
        return res.json(products);
    }

    const products = await findAll({
        attributes: { exclude: excludeList },
        where: { ...req.query },
        include: ['category', 'colors']
    });
    res.json(products);
});

router.post('/', verifyToken,
  async (req, res) => {
    if (!req.user.isAdmin) return res.status(401).json({ error: 'Access denied' });
    const product = await create(req.body);
    res.json(product);
});

router.put('/:id', verifyToken,
  async (req, res) => {
    const product = await update(req.body, req.params.id);
    res.json(product);
});

module.exports = router;