const express = require("express");

const router = express.Router();

const {
  loginTourist,
  registerTourist,
  refreshAccessToken,
  currentTourist,
} = require("../Controller/TouristController");

const { allTours, tourByID } = require("../Controller/tourController");

const stayLoggedValidator = require("../Middleware/stayLoggedIn.validation");
const validateToken = require("../Middleware/validateToken");

router.route("/login").post(stayLoggedValidator, loginTourist);
router.route("/register").post(registerTourist);
router.route("/current-home/all-tours").get(allTours);
router.route("/current-home/tour/:id").get(tourByID);

// Protected Routes //

router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-home").get(validateToken, currentTourist);

module.exports = router;
