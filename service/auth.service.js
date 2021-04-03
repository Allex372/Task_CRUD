const { O_Auth, User } = require('../dataBase/models');
const { tokenizer } = require('../helper');

const findByParams = (filterObject) => O_Auth.findOne(filterObject);

const findUser = (email) => User.findOne({ email });

const createRecord = async (userId) => {
    const tokens = tokenizer();
    await O_Auth.create({ _user_id: userId, ...tokens });

    return tokens;
};

const updateById = (recordId, updateObject) => O_Auth.findByIdAndUpdate(recordId, updateObject);

module.exports = {
    findUser,
    findByParams,
    createRecord,
    updateById
};
