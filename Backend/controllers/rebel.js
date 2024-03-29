const getProductInfo = require('../utils/rebel/getProductInfo');
const getUrls = require('../utils/rebel/getUrls');

const controller = require('./controller');
const site = "rebel";

const getProduct = async (req, res) => {
    controller.getProduct(req, res,site)
}
const startScraping = async (req, res) => {
    controller.startScraping(req, res,site,getProductInfo, getUrls)
}
const cron = async (req, res) => {
    controller.cron(req, res,site)
}
module.exports = {
    getProduct,
    startScraping,
    cron
}