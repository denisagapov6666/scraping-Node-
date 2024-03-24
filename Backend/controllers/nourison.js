const getProductInfo = require('../utils/nourison/getProductInfo');
const getUrls = require('../utils/nourison/getUrls');

const controller = require('./controller');
const site = "nourison";

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