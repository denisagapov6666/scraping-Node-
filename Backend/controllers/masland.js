const getProductInfo = require('../utils/masland/getProductInfo');
const getUrls = require('../utils/masland/getUrls');

const controller = require('./controller');
const site = "masland";

const getProduct = async (req, res) => {
    controller.getProduct(req, res,site)
}
const startScraping = async (req, res) => {
    controller.startScraping(req, res,site,getProductInfo, getUrls)
}
module.exports = {
    getProduct,
    startScraping,
}