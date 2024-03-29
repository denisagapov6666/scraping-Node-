const getProductInfo = require('../utils/fabrica/getProductInfo');
const getUrls = require('../utils/fabrica/getUrls');
const CronJob = require("./cronjob");

const site = "fabrica";
const schedule = "0 5";

const fabricaCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    fabricaCronJob
}