const getProductInfo = require('../utils/dixie/getProductInfo');
const getUrls = require('../utils/dixie/getUrls');

const controller = require('./controller');
const site = "dixie";

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