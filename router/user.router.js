const router = require('express').Router();
const { userController } = require('../controller');
const {
    userMiddleware,
    authMiddleware: { checkAccessTokenMiddleware },
    fileMiddleware
} = require('../middleware');

router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatarLength,
    fileMiddleware.checkDocumentLength,
    fileMiddleware.checkVideoLength,
    userMiddleware.isLoginExisted,
    userMiddleware.isEmailCreated,
    userMiddleware.isUserValid,
    userMiddleware.SendConfirmMail,
    userController.createUser);

router.post('/update', userController.updateUserData);

router.delete('/', userController.deleteSingleUser);

module.exports = router;
