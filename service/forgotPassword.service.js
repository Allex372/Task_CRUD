const { User } = require('../dataBase/models');

module.exports = {
    findByEmail: (email) => User.findOne({ email }),
    updateUserPassword: (userEmail, newPassword) => User.updateOne({ email: userEmail }, { $set: { password: newPassword } })
};
