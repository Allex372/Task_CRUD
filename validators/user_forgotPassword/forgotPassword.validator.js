const Joi = require('joi');

module.exports = Joi.object({
    email: Joi.string().required(),
    secret_word: Joi.string().required(),
    new_password: Joi.string().alphanum().min(8).required()
});
