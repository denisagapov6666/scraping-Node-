const getProductInfo = require('../utils/bloomsburg/getProductInfo');
const getUrls = require('../utils/bloomsburg/getUrls');

const controller = require('./controller');
const site = "bloomsburg";

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