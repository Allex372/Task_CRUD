const { O_Auth } = require('../dataBase/models');

module.exports = async () => {
    const aMinuteAgo = new Date(Date.now() - 1000 * 60 * 5);
    const oldFiles = await O_Auth.find();
    for (const oldFile of oldFiles) {
        if (oldFile.updatedAt < aMinuteAgo) {
            await O_Auth.deleteMany(oldFile);
        }
    }
};
