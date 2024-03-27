const getProductInfo = require('../utils/hardwood/getProductInfo');
const getUrls = require('../utils/hardwood/getUrls');
const CronJob = require("./cronjob");

const site = "hardwood";
const schedule = "0 8 * * 6";

const hardwoodCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    hardwoodCronJob
}