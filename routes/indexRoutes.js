const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");
const sendEmail = require('./../utils/email/sendInBlue');
const { contactUsTemplate } = require('./../utils/email/templates');

router.get('/verify-account/:id', async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findById(id);
    if(!user){
        return res.json({error: 'Wrong Url'})
    }
    user.isVerified = true;
    user.save((err)=>{
        if (err) {
            return res.status(500).json({ error: "Mongo Error" })
        }
    });
    res.status(400).json({message: `Account Verified`})
})

router.post('/contact-us', async (req, res) => {

    const emailOptions = {
        email : 'ankur.jar123@gmail.com',
        subject: `Contact Us | The Complete Project`,
        htmlContent: contactUsTemplate(req.body)
    }

    await sendEmail(emailOptions);
    res.status(201).json({ message: "Mail Recieved!" });
})

module.exports = router;
