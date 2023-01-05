const express = require("express");

const {
    registerController,
    loginController,
    getUserController,
} = require('../controllers/authController')

const ensureAuth = require("../utils/requireLoginJwt");

const router = express.Router();

router.post("/auth/register", registerController);

router.post("/auth/login", loginController);

router.get("/auth/me", ensureAuth, getUserController);

module.exports = router;
