const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const StateModel = require("../models/StateModel");

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
        res.status(201).json({ message: "Registered!" });

    } catch (err) {
        res.status(500).json(err);
    }
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

        if (passwordDoMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            return res.json({
                message: "User successfully signin",
                token,
            });
        } else {
            return res.status(422).json({ error: "Invalid Email or password" });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserController = (req, res) => {
    return res.status(200).json(req.user);
}


module.exports = {
    registerController,
    loginController,
    getUserController,
}