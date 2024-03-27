const getProductInfo = require('../utils/kaleen/getProductInfo');
const getUrls = require('../utils/kaleen/getUrls');
const CronJob = require("./cronjob");

const site = "kaleen";
const schedule = "0 9 * * 6";

const kaleenCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    kaleenCronJob
}