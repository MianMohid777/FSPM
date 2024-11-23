const express = require("express");

const router = express.Router();

const {
    loginAgency,
    registerAgency,
    refreshAccessToken,
    getCurrentAgency,
    getAllTours,
    publishTour,
    getSearchedTour,
    getPastTours,
    updateTours_ActiveComplete,
    getAgencyProfile,
    updateAgencyProfile,
    updateToursStatus,
    createProfile,
} = require("../Controller/agencyController");

const stayLoggedValidator = require("../Middleware/stayLoggedIn.validation");
const validateToken = require("../Middleware/validateToken");

router.route("/login").post(stayLoggedValidator, loginAgency);
router.route("/register").post(registerAgency);

// Protected Routes //

router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-agency").get(validateToken, getCurrentAgency);
router
    .route("/current-agency/tours/:id")
    .get(validateToken, getAllTours)
    .put(validateToken, updateTours_ActiveComplete);

router.route("/current-agency/tours/:id/:flag/:tid").put(updateToursStatus);

router
    .route("/current-agency/publish-tour/:id")
    .post(validateToken, publishTour);

router
    .route("/current-agency/profile/:id")
    .get(validateToken, getAgencyProfile)
    .put(validateToken, updateAgencyProfile)
    .post(createProfile);

module.exports = router;
