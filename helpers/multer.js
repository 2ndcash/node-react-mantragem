const multer = require('multer');
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const sharp = require("sharp");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'temp/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
    cb(null, `picture_${uniqueSuffix}_mantragem${path.extname(file.originalname)}`)
    // cb(null, `picture_${uniqueSuffix}_reconomy.webp`)
  }
})

var upload = multer({
  storage: storage,
  limits: { fieldSize: 8 * 1024 * 1024 }, //fieldSize = Max field value size (in bytes)
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// exports.resizeImages = async (req, res, next) => {
//   if (req.query.qs !== 'resize') return next()

//   if (!req.file) return next();

//   await sharp(req.file.path)
//     .resize(551, 1024)
//     .toBuffer()
//     .then(data => {
//       fs.writeFileSync(req.file.path, data);
//       return next()
//     })
//     .catch(err => {
//       console.log(err);
//       return next()
//     });
// };

module.exports = {
  upload
}