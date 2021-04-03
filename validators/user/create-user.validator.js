const Joi = require('joi');

const { regex, constants } = require('../../constant');

module.exports = Joi.object({
    name: Joi.string().alphanum().min(3).max(50)
        .allow('SexyMax@#$%?^-^'),
    email: Joi.string().regex(regex.EMAIL_REGEXP).required(),
    role: Joi.string(),
    password: Joi.string().min(5).required(),
    yearOfBorn: Joi.string().min(constants.DATA_OF_YEAR - 100).max(constants.DATA_OF_YEAR),
    age: Joi.number().positive().min(16).max(19),
    secret_word: Joi.string().required()
});
