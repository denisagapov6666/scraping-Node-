const ProductModel = require('../models/products');
const URLModel = require('../models/urls');
const historyModel = require("../models/history");
const RequestModel = require("../models/RequestModel");
const state = require("../utils/state");

const getProduct = async (req, res, site) => {
    const urlmodels = await URLModel.find({ site });
    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
        .populate({ path: 'url' });
    const total = await ProductModel
        .countDocuments({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    const history = await historyModel.find({ site });
    const newdeleteamount = await state()
    return res.status(200).json({ success: true, data: { products, total, history }, newdeleteamount })
}

const startScraping = async (req, res, site, getProductInfo, getUrls) => {
    const removed = await getUrls();
    let newpro = 0;
    if (removed.isadded > 0) {
        await getProductInfo();
        const newurlmodels = await URLModel.find({ site, new: true });
        const newproducts = await ProductModel
            .find({ url: { $in: newurlmodels.map(urlmodel => urlmodel._id) } })
        newpro = newproducts.length;
    }
    const urlmodels = await URLModel.find({ site });
    const products = await ProductModel.find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } }).populate({ path: "url" });
    const history = await historyModel.find({ site });
    const total = await ProductModel
        .countDocuments({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    await RequestModel.findOneAndUpdate({ url: req.url }, { state: false });
    const newdeleteamount = await state()
    return res.status(200).json({ success: true, data: { removed: removed.removed, new: newpro, products, total, history },newdeleteamount })
}

module.exports = {
    getProduct,
    startScraping,
}