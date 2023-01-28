const express = require("express");

const {
    registerController,
    loginController,
    getUserController,
    resetPasswordController,
    resetController,
    profileController
} = require('../controllers/authController')

const ensureAuth = require("../utils/requireLoginJwt");

const router = express.Router();

router.post("/auth/register", registerController);

router.post("/auth/login", loginController);

router.get("/auth/me", ensureAuth, getUserController);

router.post("/auth/reset-password", resetPasswordController);

router.post("/auth/reset", resetController);

router.get('/auth/profile', ensureAuth, profileController)

module.exports = router;
