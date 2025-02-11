module.exports = (err, req, res, next) => {
    // res.status(404);
    console.error(err.stack);
    res.status(500).json({ error: err.message });
};
