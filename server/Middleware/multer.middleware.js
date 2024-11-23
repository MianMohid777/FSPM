const multer = require("multer");
const path = require("path");

const dir = path.resolve(__dirname, "..");
const staticPath = path.join(dir, "Static");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, staticPath);
    console.log(file, req.body);
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
