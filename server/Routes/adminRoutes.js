const express = require("express");

const router = express.Router();

const {
    loginAdmin,
    refreshAccessToken,
    currentAdmin,
    getAllApplications,
    approveApplication,
    logOut,
    deleteApplication,
    createProfile,
} = require("../Controller/adminController");

const stayLoggedValidator = require("../Middleware/stayLoggedIn.validation");
const validateToken = require("../Middleware/validateToken");
const refreshTokenValidator = require("../Middleware/refreshToken.validator");

router.route("/login").post(stayLoggedValidator, loginAdmin);

// Protected Routes //

router.route("/refresh-token").post(refreshTokenValidator, refreshAccessToken);
router.route("/current-admin").get(validateToken, currentAdmin);
router
    .route("/current-admin/applications")
    .get(validateToken, getAllApplications);

router
    .route("/current-admin/applications/:id")
    .put(validateToken, approveApplication)
    .delete(validateToken, deleteApplication)
    .post();

router.route("/current-admin/logout").post(validateToken, logOut);
router
    .route("/current-admin/applications/init-profile/:id")
    .post(validateToken, createProfile);

module.exports = router;
