const getProductInfo = require('../utils/harcourt/getProductInfo');
const getUrls = require('../utils/harcourt/getUrls');
const CronJob = require("./cronjob");

const site = "harcourt";
const schedule = "0 7 * * 6";

const harcourtCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    harcourtCronJob
}