const getProductInfo = require('../utils/fabrica/getProductInfo');
const getUrls = require('../utils/fabrica/getUrls');

const controller = require('./controller');
const site = "fabrica";

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