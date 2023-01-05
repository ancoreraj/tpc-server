const express = require("express");
const router = express.Router();

const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");
const { CATEGORY } = require("./../utils/constants")

const ensureAuth = require("../utils/requireLoginJwt");

router.post('/create-order', ensureAuth, async (req, res) => {
    const [categoryObj] = CATEGORY.filter((cat) => req.body.category === cat.id);
    try {
        const orderObj = {
            ...req.body, 
            price: categoryObj.price,
            orderedBy: req.user._id,
        }

        const newOrder = new OrderModel(orderObj);
        await newOrder.save();
        req.user.orders.push(newOrder._id);
        await req.user.save();

        res.status(200).json({message: 'Order Saved'})
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;
