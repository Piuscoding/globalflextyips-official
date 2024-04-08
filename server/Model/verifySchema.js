
const mongoose = require("mongoose");


const verifySchema = new mongoose.Schema({
    first_name:{
        type: String
    },
    last_name:{
        type: String
    },

    email:{
        type: String
    },

    tel:{
        type: String
    },

    dateOfBirth:{
        type:String
    },

    social_media:{
        type: String
    },

    address:{
        type: String
    },

    city:{
    type: String
    },

    state:{
        type: String
    },
    
    country:{
     type: String
    },

    document_type: {
      type: String
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
},{timestamps: true})


const Verify = mongoose.model('verify', verifySchema);

module.exports = Verify;