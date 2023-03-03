const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");
const sendEmail = require("./../utils/email/sendInBlue")
const { verifyAccountTemplate, resetPasswordTemplate } = require("./../utils/email/templates")

const JWT_SECRET = process.env.JWT_SECRET;

const registerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "please add all the fields" });
        }
        const savedUser = await UserModel.findOne({ email });

        if (savedUser) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            email,
            password: hashedpassword,
        });

        await newUser.save((err) => {
            if (err) {
                return res.status(500).json({ error: "Mongo Error" })
            }
        });

        const emailOptions = {
            email,
            subject: `The Project Complete | Please Verify Your Email`,
            htmlContent: verifyAccountTemplate(newUser.id)
        }

        await sendEmail(emailOptions);
        res.status(201).json({ message: "Registered!" });

    } catch (err) {
        res.status(500).json(err);
    }
}

const sendUser = (user) => {
    const tempUser = {
        email: user.name,
        name: user.name,
        isVerified: user.isVerified,
        isFreelancer: user.isFreelancer,
    }
    return tempUser;
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please add email or password" });
        }

        const savedUser = await UserModel.findOne({ email })
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or password" });
        }

        const passwordDoMatch = await bcrypt.compare(password, savedUser.password)

        if (passwordDoMatch && savedUser.isVerified) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            return res.status(200).json({
                check: true,
                message: "User successfully signin",
                user: sendUser(savedUser),
                token,
            });
        } else {
            return res.status(200).json({ check: false, msg: "Invalid Email and Password Combination." });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserController = (req, res) => {
    return res.status(200).json(req.user);
}

const confirmationCode = () => {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 5; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token
}

const resetPasswordController = async (req, res) => {
    const { email } = req.body;
    try{
        const savedUser = await UserModel.findOne({email});
        if(!savedUser){
            return res.status(200).json({ check: false, msg: "Email Not found"});
        }

        const code = confirmationCode();

        savedUser.code = code;
        await savedUser.save();

        const emailOptions = {
            email,
            subject: `The Project Complete | Reset Password`,
            htmlContent: resetPasswordTemplate(code)
        }

        await sendEmail(emailOptions);

        return res.status(200).json({check: true, msg: 'Confirmation code sent'});

    }catch(err){
        res.status(500).json(err);
    }
}

const resetController = async (req, res) => {
    const { email, password, code } = req.body;
    try{
        const savedUser = await UserModel.findOne({email});
        if(!savedUser){
            return res.status(200).json({ check: false, msg: "Email Not found"});
        }

        if(savedUser.code !== code){
            return res.status(200).json({ check: false, msg: "Wrong Confirmation Code"});
        }

        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password, salt);

        savedUser.password = hashedpassword;
        await savedUser.save();

        return res.status(200).json({ check: true, msg: "Password Updated"});

    }catch(err){
        res.status(500).json(err);
    }
}

const profileController = async (req, res) => {
    const { user } = req;
    try {
        const orders = await OrderModel.find({ orderedBy: user._id}).sort({ createdAt: -1});
        return res.status(200).json({user, orders});
    }catch(err) {
        res.status(500).json(err);
    }
}

module.exports = {
    registerController,
    loginController,
    getUserController,
    resetPasswordController,
    resetController,
    profileController,
}