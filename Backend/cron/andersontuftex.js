const getProductInfo = require('../utils/andersontuftex/getProductInfo');
const getUrls = require('../utils/andersontuftex/getUrls');
const CronJob = require("./cronjob");

const site = "andersontuftex";
const schedule = "0 1 * * 6";

const andersontuftexCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    andersontuftexCronJob
}