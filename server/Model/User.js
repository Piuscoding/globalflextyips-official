const mongoose = require('mongoose');
const  validator  = require('validator');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    username: {
        type: String
    },
    fullname:{
        type: String,
    },
    tel:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required: validator.isEmail['Please enter an email']
        // required:  [isEmail, 'Please enter an email']
    },
    country:{
        type: String
    },
    gender:{
        type: String
    },
    password:{
        type: String,
    },
    ref:{
        type: String
    },
    address:{
        type: String,
        default: "Your address"
     },
    session:{
        type: String,
        default:"0/0"
    },

    image:{
        type: String,
    }, 
    balance:{
        type: String,
        default: "$0.00"
    },
    available:{
        type: String,
        default: "$0.00"
    },
    bonus:{
        type: String,
        default: "$0.00"
    },
    widthdrawBalance:{
        type: String,
        default: "$0.00"
    },
    profit:{
        type: String,
        default: "$0.00"
    },
    totalDeposit:{
        type: String,
        default: "$0.00"
    },
    level:{
        type: String,
        default:"basic"
    },
    dateOfBirth:{
        type: String,
        default: "Your address"
    },
    totalWidthdraw:{
        type: String,
        default: "$0.00"
    },
    refBonus:{
        type: String,
        default: "$0.00"
    },
    bank_name:{
        type: String,
        default:"your bank name"
    },
    account_name:{
        type: String,
        default:"your account name"
    },
    account_no:{
        type: String,
        default: "your account number"
    },
    swiftcode:{
        type:String,
        default: "Your swift code"
    },
    btc_address:{
        type: String,
        default: "Your Bitcoin address"
    },
    eth_address:{
        type:String,
        default:"Your Ethereum address"
    },
    ltc_address:{
        type: String,
        default:"Your litecoin address"
    },

    usdt_address:{
        type: String,
        default: "Your Usdt Address"
    },

    new_password:{
        type: String,
        default: "Your New password"
    },

    verifiedStatus:{
        type: String,
        default: 'Account not yet Verified!'
    },
    messages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'message'
    },
    plans: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'plan'
    },
    verified:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'verify'
    },
   
    deposits:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'deposit'
    },

    widthdraws:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'widthdraw'
    },
    role:{
        type: Number,
        default: 0
    }
},{timestamps: true})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await (password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
  

const User = mongoose.model('user', userSchema)

module.exports = User;
