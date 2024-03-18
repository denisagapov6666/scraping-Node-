const getProductInfo = require('../utils/fibre/getProductInfo');
const getUrls = require('../utils/fibre/getUrls');

const controller = require('./controller');
const site = "fibre";

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