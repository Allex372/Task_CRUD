const { User } = require('../dataBase/models');

module.exports = {
    createUser: (userObject) => User.create(userObject),

    updateUser: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    updateUserName: (userId, userName) => User.findByIdAndUpdate({ _id: userId }, { name: userName }),

    deleteSingleUser: (id) => User.findByIdAndUpdate({ _id: id }, { _isDeleted: 'true' }),

    findEmail: (email) => User.findOne({ email }),
};
