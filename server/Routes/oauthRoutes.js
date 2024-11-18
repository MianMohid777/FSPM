const express = require("express");

const router = express.Router();

const { oathLogin, getOauth } = require("../Controller/oauthController");

const stayLoggedValidator = require("../Middleware/stayLoggedIn.validation");
const validateToken = require("../Middleware/validateToken");

router.route("/request").post(oathLogin);
router.route("/oauth").get(getOauth);

module.exports = router;
