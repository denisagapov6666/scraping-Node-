const getProductInfo = require('../utils/fibre/getProductInfo');
const getUrls = require('../utils/fibre/getUrls');
const CronJob = require("./cronjob");

const site = "fibre";
const schedule = "2 0 * * 6";

const fibreCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    fibreCronJob
}