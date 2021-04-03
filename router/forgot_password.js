const router = require('express').Router();

const { forgotPasswordController } = require('../controller');
const { forgotPasswordMiddleware, authMiddleware } = require('../middleware');

router.post('/',
    authMiddleware.checkAccessTokenMiddleware,
    forgotPasswordMiddleware.isEmailRegistered,
    forgotPasswordMiddleware.isUserValid,
    forgotPasswordController.getUser_ChangePassword);

module.exports = router;
