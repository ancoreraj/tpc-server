const express = require("express");

const UserModel = require('./../models/UserModel')
const ensureAuth = require("../utils/requireLoginJwt");

const router = express.Router();

router.post("/add-freelance", ensureAuth, async (req, res) => {
    const {contactNo, category, name, upiId, aadharCard} = req.body;
    const {user} = req;

    try{
        user.isFreelancer = true;
        user.name = name;
        user.contactNo = contactNo;
        user.category = category;
        user.upiId = upiId;
        user.aadharCard = aadharCard;

        await user.save();
        res.status(200).json({message: 'Added as freelancer'})
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/get-freelance", async (req, res) => {
    try{
        const freelancers = await UserModel.find({isFreelancer: true});
        res.status(200).json({freelancers});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;