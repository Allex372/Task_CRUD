const { passwordsHasher, tokenizer } = require('../helper');
const { authService, userService } = require('../service');

module.exports = {
    getUserGiveToken: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await authService.findUser(email);

            await passwordsHasher.compare(password, user.password);

            const tokens = await authService.createRecord(user._id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { _user_id, _id } = req.tokenInfo;

            const tokens = tokenizer();

            await authService.updateById(_id, { ...tokens, _user_id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
