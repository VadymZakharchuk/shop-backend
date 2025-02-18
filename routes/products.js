const express = require('express');
const { findAll, create, update } = require("../controllers/products.controller");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get('/',
  async (req, res) => {
    const lang = req.headers['accept-language'] || 'en'
    const excludeList = lang === 'uk' ? ['name_en', 'description_en'] : ['name_uk', 'description_uk']
    if (req.query.id) {
        const products = await findAll({
            attributes: { exclude: excludeList },
            where: { id: req.query.id },
            include: ['category', 'colors']
        });
        return res.json(products);
    }
    const whereClause = {...req.query}
    if ('limit' in whereClause) delete whereClause.limit
    if ('offset' in whereClause) delete whereClause.offset

    const limit = req.query.limit || 99
    const offset = req.query.offset || 0
    const products = await findAll({
        attributes: { exclude: excludeList },
        where: { ...whereClause },
        include: ['category', 'colors'],
        limit: +limit,
        offset: +offset
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