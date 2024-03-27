const getProductInfo = require('../utils/wicanders/getProductInfo');
const getUrls = require('../utils/wicanders/getUrls');

const controller = require('./controller');
const site = "wicanders";

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