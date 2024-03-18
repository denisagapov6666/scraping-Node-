const getProductInfo = require('../utils/kaya/getProductInfo');
const getUrls = require('../utils/kaya/getUrls');
const CronJob = require("./cronjob");

const site = "kaya";
const schedule = "3 0 * * 6";

const kayaCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    kayaCronJob
}