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

router.post("/add-freelance", ensureAuth, async (req, res) => {
    const {contactNo, category} = req.body;
    const {user} = req;

    try{
        user.isFreelancer = true;
        user.contactNo = contactNo;
        user.category = category;

        await user.save();
        res.status(200).json({message: 'Added as freelancer'})
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
