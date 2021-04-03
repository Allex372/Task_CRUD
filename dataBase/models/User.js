const { Schema, model } = require('mongoose');
const { constants } = require('../../constant');

const userScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'user' },
    secret_word: { type: String, required: true },
    photos: { type: String },
    _isDeleted: { type: String, default: false }
    // docs: { type: String },
    // video: { type: String },
});

module.exports = model(constants.USER, userScheme);
