

const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    
    title: {
        type: String,
    },

    message:{
        type:String
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required: true
    }
}, {timestamps: true});

const Support = mongoose.model('message', messageSchema);

module.exports = Support;