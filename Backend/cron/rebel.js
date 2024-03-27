const getProductInfo = require('../utils/rebel/getProductInfo');
const getUrls = require('../utils/rebel/getUrls');
const CronJob = require("./cronjob");

const site = "rebel";
const schedule = "0 20 * * 3";

const rebelCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    rebelCronJob
}