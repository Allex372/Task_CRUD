const { ErrorHendler, errorMessages } = require('../error');

module.exports = {
    checkAccess: (whoHaveAccess = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!whoHaveAccess.length) {
                return next();
            }

            if (!whoHaveAccess.includes(role)) {
                throw new ErrorHendler(errorMessages.ACCESS_DENIED.status, errorMessages.ACCESS_DENIED.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
