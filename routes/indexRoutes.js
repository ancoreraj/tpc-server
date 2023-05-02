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
    
    res.redirect(`${process.env.CLIENT_URL}/auth/login`);
})

router.post('/contact-us', async (req, res) => {

    const emailOptions = {
        email : process.env.ADMIN_EMAIL,
        subject: `Contact Us | The Project Complete`,
        htmlContent: contactUsTemplate(req.body)
    }

    await sendEmail(emailOptions);
    res.status(201).json({ message: "Mail Recieved!" });
})

router.get('/test', (req, res)=>{
    res.send('Server is runnning');
})

module.exports = router;
