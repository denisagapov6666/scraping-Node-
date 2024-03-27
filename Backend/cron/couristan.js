const getProductInfo = require('../utils/couristan/getProductInfo');
const getUrls = require('../utils/couristan/getUrls');
const CronJob = require("./cronjob");

const site = "couristan";
const schedule = "0 3 * * 6";

const couristanCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    couristanCronJob
}