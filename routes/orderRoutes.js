const express = require("express");
const router = express.Router();
var crypto = require("crypto");

const { instance } = require('./../utils/razorpay')
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

        const options = {
            amount: Number(categoryObj.price) * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };

        console.log(options);
        const razorpayOrder = await instance.orders.create(options);

        res.status(200).json({ message: 'Ok', razorpayOrder, orderId: newOrder._id });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/payment-verification', async (req, res) => {
    const {orderId} = req.query
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log(orderId, razorpay_order_id, razorpay_payment_id)

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);
    
    const isAuthentic = expectedSignature === razorpay_signature;
    const order = await OrderModel.findById(orderId);
    if(isAuthentic){
        order.razorpay_order_id = razorpay_order_id;
        order.razorpay_payment_id = razorpay_payment_id;
        await order.save();

        res.redirect(
            `http://localhost:3000/`
        );
    }else {
        res.status(400).json({
            success: false,
        });
    }
});


module.exports = router;
