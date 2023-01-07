const express = require("express");

const ensureAuth = require("../utils/requireLoginJwt");

const router = express.Router();

router.post("/add-freelance", ensureAuth, async (req, res) => {
    const {contactNo, category, name} = req.body;
    const {user} = req;

    try{
        user.isFreelancer = true;
        user.name = name;
        user.contactNo = contactNo;
        user.category = category;

        await user.save();
        res.status(200).json({message: 'Added as freelancer'})
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;