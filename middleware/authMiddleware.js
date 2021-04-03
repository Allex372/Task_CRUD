const jwt = require('jsonwebtoken');
const { errorMessages, ErrorHendler } = require('../error');
const { config: { JWT_ACCESS, JWT_REFRESH } } = require('../config');
const { constants: { AUTHORIZATION } } = require('../constant');
const { authService } = require('../service');

const { O_Auth } = require('../dataBase/models');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                throw new Error('Token is required');
            }

            jwt.verify(access_token, JWT_ACCESS, (err) => {
                if (err) {
                    throw new Error('Not valid token VERIFY');
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error('Not valid token');
            }

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkRefreshTokenMiddleware: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHendler(errorMessages.TOKEN_REQUIRED.status, errorMessages.TOKEN_REQUIRED.customCode);
            }

            jwt.verify(refresh_token, JWT_REFRESH, (err) => {
                if (err) {
                    throw new ErrorHendler(errorMessages.UNAUTHORIZED, errorMessages.USER_NOT_FOUND.customCode);
                }
            });

            const tokens = await authService.findByParams({ refresh_token });

            if (!tokens) {
                throw new ErrorHendler(errorMessages.UNAUTHORIZED, errorMessages.USER_NOT_FOUND.customCode);
            }

            req.tokenInfo = tokens;
            next();
        } catch (e) {
            next(e);
        }
    }
};
