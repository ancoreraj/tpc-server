const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    fileUrl: {
        type: String,
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', orderSchema);