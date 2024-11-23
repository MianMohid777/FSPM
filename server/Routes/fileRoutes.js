const express = require("express");

const router = express.Router();

const {
    getImage,
    uploadImage,
    uploadGallery,
    getImageSubString,
} = require("../Controller/fileController");
const { upload } = require("../Middleware/multer.middleware");

router.route("/:filename").get(getImage);
router.route("/:filename").get(getImageSubString);
router.route("/upload").post(upload.single("file"), uploadImage);
router.route("/upload-gallery").post(upload.array("files", 10), uploadGallery);

module.exports = router;
