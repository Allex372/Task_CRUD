const cron = require('node-cron');
// const calculateStatistic = require('./calculate-statictic');
const deleteOldTokens = require('./deleteOldTokens');

module.exports = () => {
    cron.schedule('*/1 * * * * *', () => {
        // calculateStatistic();
        // deleteOldTokens();
    });
};
