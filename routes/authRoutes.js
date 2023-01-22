const express = require("express");

const {
    registerController,
    loginController,
    getUserController,
    resetPasswordController,
    resetController
} = require('../controllers/authController')

const ensureAuth = require("../utils/requireLoginJwt");

const router = express.Router();

router.post("/auth/register", registerController);

router.post("/auth/login", loginController);

router.get("/auth/me", ensureAuth, getUserController);

router.post("/auth/reset-password", resetPasswordController);

router.post("/auth/reset", resetController);

module.exports = router;
