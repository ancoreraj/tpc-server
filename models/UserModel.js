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
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        default: []
    }]
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)