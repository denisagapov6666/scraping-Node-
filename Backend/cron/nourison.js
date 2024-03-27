const getProductInfo = require('../utils/nourison/getProductInfo');
const getUrls = require('../utils/nourison/getUrls');
const CronJob = require("./cronjob");

const site = "nourison";
const schedule = "0 12 * * 6";

const nourisonCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    nourisonCronJob
}