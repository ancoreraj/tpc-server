const express = require("express");
const router = express.Router();
var crypto = require("crypto");

const OrderModel = require("../models/OrderModel");
const { instance } = require('./../utils/razorpay');
const { CATEGORY } = require("./../utils/constants");
const sendEmail = require("./../utils/email/sendInBlue")
const { orderPlacedUserTemplate, orderRecievedTemplate, cancelOrderTemplate } = require("./../utils/email/templates")

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

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
        .update(body.toString())
        .digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;
    const order = await OrderModel.findById(orderId).populate('orderedBy');
    if(isAuthentic){
        order.razorpay_order_id = razorpay_order_id;
        order.razorpay_payment_id = razorpay_payment_id;
        order.isPaid = true;
        await order.save();

        const userTemplateBody = {
            name: order.name,
            title: order.title,
            orderId: orderId,
            price: order.price
        }
        const emailOptionsUser = {
            email: order.orderedBy.email,
            subject: 'Order Placed | The Project Complete',
            htmlContent: orderPlacedUserTemplate(userTemplateBody)
        }

        await sendEmail(emailOptionsUser);

        const emailOptionsAdmin = {
            email: process.env.ADMIN_EMAIL,
            subject: 'The Project Complete | New Order Recieved',
            htmlContent: orderRecievedTemplate(order)
        }

        await sendEmail(emailOptionsAdmin);

        res.redirect(
            `${process.env.CLIENT_URL}/?orderPlaced=true`
        );
    }else {
        res.status(400).json({
            success: false,
        });
    }
});

router.get('/cancel-order/:id', ensureAuth, async (req, res) => {
    const { id } = req.params;
    try{
        const order = await OrderModel.findById(id).populate('orderedBy')

        if(order?.isCanceled) {
            return res.status(200).json({ check: false, msg : 'Your order is already canceled'});
        }

        const options = {
            "amount": Number(order.price),
            "currency": "INR",
            "speed": "normal",
            "speed_processed": 'normal',
        }
        const cancelOrder = await instance.payments.refund(order.razorpay_payment_id, options);

        order.isCanceled = true;
        await order.save();

        const emailOptions = {
            email: order.orderedBy.email,
            subject: 'Order Canceled | The Project Complete',
            htmlContent: cancelOrderTemplate(id, order.title, order.price)
        }

        await sendEmail(emailOptions);

        res.status(200).json({ check: true });
    }catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;
