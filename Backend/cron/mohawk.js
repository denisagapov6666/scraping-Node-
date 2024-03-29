// const getProductInfo = require('../utils/mohawk/getProductInfo');
const getUrls = require('../utils/mohawk/getUrls');
const CronJob = require("./cronjob");

const site = "mohawk";
const schedule = "0 18";

const mohawkCronJob = () => {
    CronJob.CronJob1(site,schedule,getUrls)
}
module.exports = {
    mohawkCronJob
}