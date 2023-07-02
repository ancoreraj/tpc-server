const express = require("express");

const UserModel = require('./../models/UserModel');
const OrderModel = require('./../models/OrderModel');
const ensureAuth = require("../utils/requireLoginJwt");
const { freelanceTemplate, setFreelanceTemplate } = require('./../utils/email/templates');
const { CATEGORY, FREELANCE_CATEGORY } = require('./../utils/constants');
const sendEmail = require("../utils/email/sendInBlue");

const router = express.Router();

const getCategory = (category) => {
    let categoryArr = [];
    let userCategory = category.join(",");
    userCategory = userCategory.split(",");
    FREELANCE_CATEGORY.map((cat) => {
        userCategory.map((id) => {
            if(cat.id === id){
                categoryArr.push(cat.val);
            }
        })
    })
    return categoryArr.join(", ");
}

router.post("/add-freelance", ensureAuth, async (req, res) => {
    const {contactNo, category, name, upiId, aadharCard, pincode, address, accountNo, accountName, ifscCode} = req.body;
    const {user} = req;

    let emailCategory = getCategory(category);

    try{
        user.isFreelancer = true;
        user.name = name;
        user.contactNo = contactNo;
        user.category = category.join(",");
        user.upiId = upiId ? upiId : '';
        user.aadharCard = aadharCard;
        user.pincode = pincode;
        user.address = address;
        user.accountNo = accountNo;
        user.ifscCode = ifscCode;
        user.accountName = accountName;

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

router.post("/set-freelance", async (req, res) => {
    let { orderId, email } = req.body;
    try {
        orderId = orderId.trim();
        const getOrder = await OrderModel.findById(orderId);
        if(!getOrder){
            return res.status(200).json({check: false, msg: "Wrong Order Id"});
        }

        // if(String(getOrder.category) !== String(category)){
        //     return res.status(200).json({check: false, msg: "Order Category dosen't match with Partner User Category."});
        // }

        const templateObj = {
            title: getOrder.title,
            description : getOrder.description,
            fileUrl: getOrder.fileUrl
        }

        const emailOptions = {
            email: email,
            subject: `New Project Requirement Recieved`,
            htmlContent: setFreelanceTemplate(templateObj),
        }

        await sendEmail(emailOptions);

        return res.status(200).json({ check: true, msg: "Email Sent to the Partner"});

    }catch(err){
        res.status(500).json(err);
    }
})

router.post('/update-freelance', ensureAuth, async (req, res) => {
    
    await UserModel.findByIdAndUpdate(req.user._id, req.body);

    res.status(200).json({msg: "User Update"});
});

module.exports = router;