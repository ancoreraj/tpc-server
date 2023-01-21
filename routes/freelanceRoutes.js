const express = require("express");

const UserModel = require('./../models/UserModel');
const ensureAuth = require("../utils/requireLoginJwt");
const { freelanceTemplate } = require('./../utils/email/templates');
const { CATEGORY } = require('./../utils/constants');
const sendEmail = require("../utils/email/sendInBlue");

const router = express.Router();

router.post("/add-freelance", ensureAuth, async (req, res) => {
    const {contactNo, category, name, upiId, aadharCard} = req.body;
    const {user} = req;

    let emailCategory;
    CATEGORY.map((item) => {
        if(item.id === category){
            emailCategory = item.val;
        }
    })

    try{
        user.isFreelancer = true;
        user.name = name;
        user.contactNo = contactNo;
        user.category = category;
        user.upiId = upiId;
        user.aadharCard = aadharCard;

        await user.save();

        const emailOptions = {
            email: user.email,
            subject: `Congratulations | The Project Project`,
            htmlContent: freelanceTemplate({name, category: emailCategory}),
        }

        await sendEmail(emailOptions);
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