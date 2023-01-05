const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");

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

module.exports = router;
