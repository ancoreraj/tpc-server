const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({

    isVerified : {
        type: Boolean,
        required: true,
        default: false
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: []
    }]
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Partner', partnerSchema)