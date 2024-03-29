const getProductInfo = require('../utils/wicanders/getProductInfo');
const getUrls = require('../utils/wicanders/getUrls');
const CronJob = require("./cronjob");

const site = "wicanders";
const schedule = "0 16";

const wicandersCronJob = () => {
    CronJob.CronJob(site,schedule, getProductInfo,getUrls)
}
module.exports = {
    wicandersCronJob
}