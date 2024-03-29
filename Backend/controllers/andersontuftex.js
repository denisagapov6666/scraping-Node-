const getProductInfo = require('../utils/andersontuftex/getProductInfo');
const getUrls = require('../utils/andersontuftex/getUrls');

const controller = require('./controller');
const site = "andersontuftex";

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