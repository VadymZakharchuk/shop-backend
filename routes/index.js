const express = require('express');
const { dirname } = require('path');
const fileMiddleware = require('../middleware/file');
const router = express.Router();

// загрузка файлов
router.post('/upload-image', fileMiddleware.single('file'), (req, res) => {
    if (req.body.file) {
        const { path } = req.body.file;
        console.log(path);

        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/download-image/:filename',
  (req, res) => {
    const appDir = dirname(require.main.filename);
    res.download(`${appDir}${process.env.IMAGES_PATH}${req.params.filename}`, req.params.filename, err=>{
        if (err){
            console.log(err)
            res.status(404).json();
        }
    });
});

module.exports = router;
