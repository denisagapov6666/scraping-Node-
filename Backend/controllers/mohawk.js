// const getProductInfo = require('../utils/mohawk/getProductInfo');
const getUrls = require('../utils/mohawk/getUrls');

const controller = require('./controller');
const site = "mohawk";

const getProduct = async (req, res) => {
    controller.getProduct(req, res,site)
}
const startScraping = async (req, res) => {
    controller.startScraping1(req, res,site, getUrls)
}
const cron = async (req, res) => {
    controller.cron(req, res,site)
}
module.exports = {
    getProduct,
    startScraping,
    cron
}