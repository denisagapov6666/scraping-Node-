const getProductInfo = require('../utils/adorra/getProductInfo');
const getUrls = require('../utils/adorra/getUrls');
const CronJob = require("./cronjob");

const site = "adorra";
const schedule = "0 0";

const adorraCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    adorraCronJob
}