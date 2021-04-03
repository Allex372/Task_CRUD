const { ErrorHendler, errorMessage } = require('../error/error.messages');
const { userService } = require('../service');
const { forgotPasswordValidator } = require('../validators');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = forgotPasswordValidator.forgotPasswordValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailRegistered: async (req, res, next) => {
        try {
            const { email } = req.body;

            const isEmail = await userService.findEmail(email);

            if (!isEmail) {
                throw new ErrorHendler(errorMessage.USER_NOT_FOUND.status, errorMessage.USER_NOT_FOUND.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
