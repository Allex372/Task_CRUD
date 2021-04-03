const router = require('express').Router();
const { UserAccess, AdminAccess } = require('../constant/constants');
const { authController } = require('../controller');

const { authMiddleware, checkRoleMiddleware } = require('../middleware');

router.post('/',
    authController.getUserGiveToken);

router.post('/refresh', authMiddleware.checkRefreshTokenMiddleware, authController.refreshToken);

module.exports = router;
