const getProductInfo = require('../utils/bloomsburg/getProductInfo');
const getUrls = require('../utils/bloomsburg/getUrls');
const CronJob = require("./cronjob");

const site = "bloomsburg";
const schedule = "5 * * * 6";

const bloomsburgCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    bloomsburgCronJob
}