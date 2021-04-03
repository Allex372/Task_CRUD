const router = require('express').Router();

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const forgot_password = require('./forgot_password');

router.use('/auth', authRouter);

router.use('/users', userRouter);

router.use('/forgot_password', forgot_password);

module.exports = router;
