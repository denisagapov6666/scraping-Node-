const getProductInfo = require('../utils/dixie/getProductInfo');
const getUrls = require('../utils/dixie/getUrls');
const CronJob = require("./cronjob");

const site = "dixie";
const schedule = "0 4"

const dixieCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    dixieCronJob
}