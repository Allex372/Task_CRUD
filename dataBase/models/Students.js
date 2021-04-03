const { Schema, model } = require('mongoose');
const { constants } = require('../../constant');

const studentsScheme = new Schema({
    name: { type: String, required: true },
    age: { type: Number, default: 1999 },
    gender: { type: Array },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(constants.Students, studentsScheme);
