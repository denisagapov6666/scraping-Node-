const getProductInfo = require('../utils/hardwood/getProductInfo');
const getUrls = require('../utils/hardwood/getUrls');

const controller = require('./controller');
const site = "hardwood";

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