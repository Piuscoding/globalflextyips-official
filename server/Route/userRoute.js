const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');



router.get('/dashboard',userController.dashboardPage);

router.get("/kyc-form", userController.verifyAccountPage)
router.get('/verify-account',userController.kycPage);

router.post('/verify/:id', userController.verifyPage_post);

router.get('/account-settings/:id',userController.accountPage);
router.put('/account-settings/:id',userController.accountPage_post);
// router.get('/editProfile',userController.editProfilePage);

// router.get('/transactions/:id',userController.transactionPage);

router.get('/all/:id',userController.allPage);
// router.post('/trading-live/:id',userController.livePage_post);
// router.get('/tradinghistory/:id', userController.tradingHistory)

// router.get('/accountUpgrade',userController.upgradePage);
// router.post('/accountUpgrade/:id',userController.upgradePage_post);

router.get('/deposit', userController.depositPage);
router.get('/payment', userController.paymentPage);


// router.get('/tradinghistory', userController.tradinghistoryPage);
router.post('/deposit/:id', userController.depositPage_post);
// router.get('/accounthistory/:id',userController.depositHistory);

router.get('/withdrawal',userController.widthdrawPage);
router.get('/withdraw-funds',userController.withdrawFundPage);
router.post('/widthdraw/:id',userController.widthdrawPage_post);
router.get('/tradinghistory/:id',userController.widthdrawHistory);

router.get('/buy-plan',userController.buyplanPage);
router.post('/buy-plan/:id',userController.buyplanPage_post);

router.get('/asset-balance',userController.assetbalancePage);
router.get('/referuser',userController.referuserPage);
router.get('/transfer-funds',userController.fundsPage);
router.get('/accounthistory/:id',userController.historyPage);
router.get('/support',userController.supportPage);
router.post('/sendcontact/:id',userController.supportPage_post);



// // router.get('/buyCrypto', userController.buyCrypto)

module.exports = router;

