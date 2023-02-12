const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isVerified : {
        type: Boolean,
        required: true,
        default: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: []
    }],
    isFreelancer: {
        type: Boolean,
        default: false
    },
    contactNo: {
        type: String,
    },
    category: {
        type: String,
    },
    upiId: {
        type: String
    },
    aadharCard: {
        type: String
    },
    pincode: {
        type: String
    },
    address: {
        type: String
    },
    accountName: {
        type: String
    },
    accountNo: {
        type: String,
    },
    ifscCode: {
        type: String,
    },
    code: {
        type: String
    }    
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)