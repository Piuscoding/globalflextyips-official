const mongoose = require('mongoose');


const depositSchema = new mongoose.Schema({
    payment_method:{
        type: String,
        required: true
    },
    amount: {
        type: String
    },
   
    status: {
        type: String,
        default: 'pending'
    },

    image:{
        type: String,
        // required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Deposit = mongoose.model('deposit', depositSchema);

module.exports = Deposit;
