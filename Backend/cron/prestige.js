const getProductInfo = require('../utils/prestige/getProductInfo');
const getUrls = require('../utils/prestige/getUrls');
const CronJob = require("./cronjob");

const site = "prestige";
const schedule = "0 13 * * 6";

const prestigeCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    prestigeCronJob
}