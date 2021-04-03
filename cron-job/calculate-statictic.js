const { User } = require('../dataBase/models');
const { emailService } = require('../service');
const { emailActions, constants: { AdminMail } } = require('../constant');

module.exports = async () => {
    const countedUsers = await User.countDocuments();
    // await emailService.sendMail(AdminMail, emailActions.STATISTIC, { userName: countedUsers });
    console.log(countedUsers);
};
