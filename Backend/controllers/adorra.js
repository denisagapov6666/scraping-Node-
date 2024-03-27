const getProductInfo = require('../utils/adorra/getProductInfo');
const getUrls = require('../utils/adorra/getUrls');

const controller = require('./controller');
const site = "adorra";

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