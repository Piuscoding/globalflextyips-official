

const mongoose = require('mongoose');


const planSchema = new mongoose.Schema({

    type:{
        type:String
    },

    amount: {
        type: Number,
    },

    number: {
        type: Number,
    },
    status: {
        type: String,
        default: 'pending'
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Plan  = mongoose.model('plan', planSchema);

module.exports = Plan;