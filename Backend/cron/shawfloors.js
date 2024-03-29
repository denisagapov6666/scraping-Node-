const getProductInfo = require('../utils/shawfloors/getProductInfo');
const getUrls = require('../utils/shawfloors/getUrls');
const CronJob = require("./cronjob");

const site = "shawfloors";
const schedule = "0 15";

const shawfloorsCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    shawfloorsCronJob
}