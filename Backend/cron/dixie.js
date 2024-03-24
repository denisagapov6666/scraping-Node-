const getProductInfo = require('../utils/dixie/getProductInfo');
const getUrls = require('../utils/dixie/getUrls');
const CronJob = require("./cronjob");

const site = "dixie";
const schedule = "10 * * * 6";

const dixieCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    dixieCronJob
}