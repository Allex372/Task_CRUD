const { forgotPasswordService, emailService } = require('../service');
const { emailActions } = require('../constant');
const { passwordsHasher } = require('../helper');
const { ErrorHendler, errorMessages: { USER_NOT_FOUND, PASSWORD_WAS_CHANGED } } = require('../error');

module.exports = {
    getUser_ChangePassword: async (req, res) => {
        try {
            const { email, secret_word, new_password } = req.body;

            const user = await forgotPasswordService.findByEmail(email);

            if (!user) {
                throw new ErrorHendler(USER_NOT_FOUND.status, USER_NOT_FOUND.customCode);
            }

            await passwordsHasher.compare(secret_word, user.secret_word);

            const hash_New_Password = await passwordsHasher.hash(new_password);

            await forgotPasswordService.updateUserPassword(email, hash_New_Password);

            await emailService.sendMail(email, emailActions.INFO, { userName: user.name });

            res.json(PASSWORD_WAS_CHANGED);
        } catch (e) {
            res.json(e.message);
        }
    },

};
