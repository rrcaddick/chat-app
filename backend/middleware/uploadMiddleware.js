const path = require("path");
const { v4: uuid } = require("uuid");
const multer = require("multer");
const allowedFiles = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "temp", "images"));
  },
  filename: function (req, file, cb) {
    const fileName = `${uuid()}-${file.originalname}`;
    cb(null, fileName);
  },
});

function fileFilter(req, file, cb) {
  try {
    if (allowedFiles.includes(file.mimetype)) {
      return cb(null, true);
    }
    cb(null, false);
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
