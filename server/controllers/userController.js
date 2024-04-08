const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Widthdraw = require('../Model/widthdrawSchema');
const Verify = require("../Model/verifySchema");
const Plan = require("../Model/planSchema");
const Support = require("../Model/support")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        console.log(val);
        console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }




  const maxAge = 3 * 24 * 60 * 60;
  const createToken = (id) => {
    return jwt.sign({ id }, 'piuscandothis', {
      expiresIn: maxAge
    });
  };




module.exports.homePage = (req, res)=>{
res.render("index")
}

module.exports.aboutPage = (req, res)=>{
    res.render("about")
    }
    
module.exports.invplanPage = async(req, res)=>{
    res.render("inv-plans")
}

module.exports.statisticPage = (req, res)=>{
    res.render("statistic")
}

module.exports.verifyPage = (req, res)=>{
    res.render("verify")
}



    module.exports.contactPage = (req, res)=>{
        res.render("contact")
   }
        

    module.exports.affliatePage = (req, res)=>{
      res.render("affiliate_program")
      }
      
      module.exports.startguidePage = (req, res)=>{
          res.render("start_guide")
      }
  
       module.exports.licensePage = (req, res)=>{
          res.render("license")
     }
    

   module.exports.faqPage = (req, res)=>{
    res.render("faqs")
    }
    
    module.exports.termsPage = (req, res)=>{
        res.render("terms")
    }

    module.exports.registerPage = (req, res)=>{
        res.render("register")
    }
    


const sendEmail = async ( fullname, email,  password ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.ameliarioofficial.com',
      port:  465,
      auth: {
        user: 'ameliari',
        pass: '4Zvl7Ds8^n~V'
      }
  
      });
    const mailOptions = {
      from:'ameliari@ameliarioofficial.com',
      to:email,
      subject: 'Welcome to GLOBALFLEXTIPS',
      html: `<p>Hello  ${fullname},<br>You are welcome to globalflextyips , we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.

      Please note that your deposit is with the wallet address provided by globalflextyips  trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by globalflextyips , hence your deposit is invalid.<br><br>
      
      <br><br>Best Regards,
      Management<br><br>
      
      Copyrights 2023 @ globalflextyips  Official . All Rights Reserved..<br><br>
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: <br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}

module.exports.register_post = async (req, res) =>{
  const {fullname, email,account, country, gender,tel, password, } = req.body;
  try {
      const user = await User.create({fullname, email,account, country, gender,tel, password});
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json({ user: user._id });

      if(user){
        sendEmail(req.body.fullname,req.body.email, req.body.password)
      }else{
        console.log(error);
      }
    }
      catch(err) {
          const errors = handleErrors(err);
          res.status(400).json({ errors });
        }
  
}

module.exports.loginPage = (req, res)=>{
    res.render("login")
}

const loginEmail = async (  email ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.ameliarioofficial.com',
      port:  465,
      auth: {
        user: 'ameliari',
        pass: '4Zvl7Ds8^n~V'
      }
  
      });
    const mailOptions = {
      from:'ameliari@ameliarioofficial.com',
      to:email,
      subject: 'Your account has recently been logged In',
      html: `<p>Greetings,${email}<br>your trading account has just been logged in by a device .<br>
     if it's not you kindly message support to terminate access  <br>You can login here: https://ameliarioofficial.com/login.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})


  } catch (error) {
    console.log(error.message);
  }
}



module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });

        if(user){
          loginEmail(req.body.email)
        }else{
          console.log(error);
        }
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.loginAdmin = (req, res)=>{
    res.render("loginAdmin")
}

module.exports.dashboardPage = async(req, res) =>{
  res.render('dashboard');
}


module.exports.kycPage = async(req, res)=>{
    res.render("kyc-form")
}

module.exports.verifyAccountPage = async(req, res)=>{
  res.render("verify-account")
}


const verifyEmail = async (email,fullname ) =>{
    
    try {
      const transporter =  nodemailer.createTransport({
        host: 'mail.ameliarioofficial.com',
        port:  465,
        auth: {
          user: 'ameliari',
          pass: '4Zvl7Ds8^n~V'
        }
    
        });
      const mailOptions = {
        from:email,
        to:'ameliari@ameliarioofficial.com',
        subject: 'Verification request',
        html: `<p>Hello ${fullname},<br>someone verification request.<br>
        and it is immeditaly under review by admins<br>You can login here: https://ameliarioofficial.com/loginAdmin<br> to check verification and update.<br>Thank you.</p>`
    }
    transporter.sendMail(mailOptions, (error, info) =>{
      if(error){
          console.log(error);
          res.send('error');
      }else{
          console.log('email sent: ' + info.response);
          res.send('success')
      }
  })
  
  
    } catch (error) {
      console.log(error.message);
    }
  }


module.exports.verifyPage_post = async(req, res)=>{
    // const { email, username,fullname,city,gender,dateofBirth,marital,age,address,image} =req.body
    let theImage;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
        console.log('no files to upload')
    }else{
            theImage = req.files.image;
            newImageName = theImage.name;
            uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

            theImage.mv(uploadPath, function(err){
                if(err){
                    console.log(err)
                }
           })

    }
    try{
        const verification = new Verify({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            social_media: req.body.social_media,
            state: req.body.state,
            country: req.body.country,
            document_type: req.body.document_type,
             city: req.body.city,
             dateofBirth: req.body.dateofBirth,
             address: req.body.address,
             image: newImageName
        })
        verification.save()
        const id = req.params.id;
        const user = await User.findById(id);
        user.verified.push(verification);
        await user.save();

        if(user){
            verifyEmail(req.body.fullname)
            res.redirect("/dashboard")   
        }else{
            console.log(error)
        }
    }catch(error){
        console.log(error)
    }

}

module.exports.accountPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id);
  res.render('account-settings',{user})
}

module.exports.accountPage_post = async(req, res) =>{
      try {
          await User.findByIdAndUpdate(req.params.id,{
            fullname: req.body.fullname,
            tel: req.body.tel,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            bank_name: req.body.bank_name,
            account_name: req.body.account_name,
            account_no: req.body.account_no,
            swiftcode: req.body.swiftcode,
            btc_address: req.body.btc_address,
            eth_address: req.body.eth_address,
            ltc_address: req.body.ltc_address,
            usdt_address: req.body.usdt_address,
            password: req.body.password,
            new_password: req.body.new_password,
            updatedAt: Date.now()
          });
  
            await res.redirect(`/account-settings/${req.params.id}`);
            
            console.log('redirected');
        } catch (error) {
          console.log(error);
        }
      
  }


const planEmail = async (  email, amount, method ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.ameliarioofficial.com',
        port:  465,
        auth: {
          user: 'ameliari',
          pass: '4Zvl7Ds8^n~V'
        }
  
      });
    const mailOptions = {
      from:email,
      to:'ameliari@ameliarioofficial.com',
      subject: 'An investment Plan Request Just Made',
      html: `<p>Hello SomeOne,<br>made a Plan request of ${amount}.<br>
      plan details are below Admin <br>Pending Plan: ${amount}<br> <br>Payment Method: ${method}<br><br>Plan status:Pending <br>You can login here: https://ameliarioofficial.com/loginAdmin<br> to approve the investment plan.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}

module.exports.buyplanPage_post = async(req, res)=>{
    // const {amount, method,image} = req.body
    try {
        const plan = new Plan({
             type: req.body.type,
             amount: req.body.amount,
             number: req.body.number,
             status: req.body.status
        })
        plan.save()
        const id = req.params.id;
        const user = await User.findById( id);
         user.plans.push(plan)
        //  await User.findById(id).populate("upgrades")
        await user.save();
        res.render("All", {user})
        if(user){
            planEmail(req.body.amount, req.body.type)
            // req.flash('success_msg', 'your upgrade under review')
            // res.redirect("/dashboard")
        }else{
              console.log(error);
            }
    } catch (error) {
        console.log(error)
    }
}

module.exports.allPage = async(req, res)=>{
  try {
    const id = req.params.id
 const user = await User.findById(id).populate("plans")
   res.render('All', { user});
   } catch (error) {
     console.log(error)
   }
}


module.exports.depositPage = async(req, res) =>{
    res.render("deposits")
}

module.exports.widthdrawPage = async(req, res)=>{
    res.render("withdrawals")
}

module.exports.withdrawFundPage = async(req, res)=>{
  res.render("withdraw-funds")
}


// withdrawFundPage

module.exports.paymentPage = async(req, res)=>{
    res.render("payment")
}

// module.exports.tradinghistoryPage = async(req, res)=>{
//     res.render("tradeHistory")
// }

module.exports. buyplanPage= async(req, res)=>{
    res.render("buy-plan")
}

module.exports.assetbalancePage = async(req, res)=>{
    res.render("asset-balance")
}

module.exports.referuserPage = async(req, res)=>{
    res.render("referuser")
}

module.exports.fundsPage = async(req, res)=>{
    res.render("asset-balance")
}


module.exports.supportPage = async(req, res)=>{
    res.render("support")
}

const  supportEmail = async (  fullname, email, title, message ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.ameliarioofficial.com',
      port:  465,
      auth: {
        user: 'ameliari',
        pass: '4Zvl7Ds8^n~V'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'ameliari@ameliarioofficial.com',
      subject: `${title}`,
      html: `<p>hello i am ${fullname}<br><br>${message}<br><br>login here to attend to client https://ameliarioofficial.com/loginAdmin</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}


module.exports.supportPage_post = async(req, res)=>{
  const message = new Support({
    title: req.body.title,
    message: req.body.message
  })
  message.save()

  const id = req.params.id;
  const user = await User.findById( id);
  user.messages.push(message)
  await user.save();

  res.render("support", {user})
  if(user){
    supportEmail(req.body.fullname, req.body.title, req.body.message)
  
}else{
    console.log(error)
}
}


const depositEmail = async (  email, amount, type, narration ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.ameliarioofficial.com',
      port:  465,
      auth: {
        user: 'ameliari',
        pass: '4Zvl7Ds8^n~V'
      }
  
      });
    const mailOptions = {
      from:email,
      to:'ameliari@ameliarioofficial.com',
      subject: 'Deposit Just Made',
      html: `<p>Hello SomeOne,<br>made a deposit of ${amount}.<br>
      deposit detail are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending <br> <br><br>Deposit type:${type} <br> <br> <br><br>Deposit narration:${narration} <br> You can login here: https://ameliarioofficial.com/loginAdmin<br> to approve the deposit.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})



  } catch (error) {
    console.log(error.message);
  }
}



module.exports.depositPage_post = async(req, res) =>{
    // const {type, amount, status, image, narration} = req.body
    let theImage;
    let uploadPath;
    let newImageName;

    if(!req.files || Object.keys(req.files).length === 0){
        console.log('no files to upload')
    }else{
            theImage = req.files.image;
            newImageName = theImage.name;
            uploadPath = require('path').resolve('./') + '/Public/IMG_UPLOADS' + newImageName

            theImage.mv(uploadPath, function(err){
                if(err){
                    console.log(err)
                }
            })

    }
    try {
        const deposit = new Deposit({
            payment_method: req.body.payment_method,
            amount: req.body.amount,
            status: req.body.status,
             image: newImageName
        })
        deposit.save()
        const id = req.params.id;
        const user = await User.findById( id);
        user.deposits.push(deposit);
        // await User.findById(id).populate("deposits")
        await user.save();

        res.render("transactions",{user})
        if(user){
            depositEmail(req.body.type, req.body.amount)
            // req.flash('success_msg', 'your deposit is successful')
        }else{
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
  
}

module.exports.historyPage = async(req, res)=>{
  try {
         const id = req.params.id
      const user = await User.findById(id).populate("deposits")
        res.render('transactions', { user});
        } catch (error) {
          console.log(error)
        }
}



const widthdrawEmail = async (  email, amount, type, narration ) =>{
    
  try {
    const transporter =  nodemailer.createTransport({
      host: 'mail.ameliarioofficial.com',
        port:  465,
        auth: {
          user: 'ameliari',
          pass: '4Zvl7Ds8^n~V'
        }
  
      });
    const mailOptions = {
      from:email,
      to:'ameliari@ameliarioofficial.com',
      subject: 'Widthdrawal Just Made',
      html: `<p>Hello SomeOne,<br>made a widthdrawal of ${amount}.<br>
      deposit detail are below Admin <br>Pending Widthdraw: ${amount}<br><br>Widthdraw status:Pending <br> <br><br>Widthdraw type:${type} <br> <br> <br><br>Widthdraw narration:${narration} <br> You can login here: https://ameliarioofficial.com/loginAdmin<br> to approve the widthdrawal.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }

})
} catch (error) {
    console.log(error.message);
  }
}
 
module.exports.widthdrawPage_post = async(req, res) =>{
    // const {amount, type, status, narration} = req.body
  try {
    const widthdraw = new Widthdraw({
    amount: req.body.amount,
    type: req.body.type,
    status: req.body.status,
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save()

    res.render("tradeHistory", {user})
        if(user){
            widthdrawEmail(req.body.amount,req.body.type )
        }else{
            console.log(error)
        }
 
  } catch (error) {
    console.log(error)
  }

}


module.exports.widthdrawHistory = async(req, res) =>{
  const id = req.params.id
    const user = await User.findById(id).populate("widthdraws")
     res.render('tradeHistory', { user})
}


module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  }



