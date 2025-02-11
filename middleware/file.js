const multer = require('multer');
const generateUniqueId = require("generate-unique-id");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.env.IMAGES_PATH)
  },
  filename(req, file, cb) {
    const id = generateUniqueId({
      length: 10
    });
    cb(null, `${id}-${file.originalname}`)
  }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
};

module.exports = multer({
  storage, fileFilter
});
