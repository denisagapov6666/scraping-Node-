const ProductModel = require('../models/couristan/ProductModel');
const URLModel = require('../models/couristan/URLModel');
const RequestModel = require("../models/RequestModel");

const getProductInfo = require('../utils/couristan/getProductInfo');
const getUrls = require('../utils/couristan/getUrls');
const historyModel = require("../models/couristan/history");



const getProduct = async (req, res) => {
    const urlmodels = await URLModel.find();
    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
        .populate({ path: 'url' });
    const total = await ProductModel
        .countDocuments({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    return res.status(200).json({ success: true,data: {products,total} })
}

const startScraping = async (req, res) => {
    const removed = await getUrls();
    let newpro = 0;
    if(removed.isadded>0){
        await getProductInfo();
        const newurlmodels = await URLModel.find({ new: true });
        const newproducts = await ProductModel
            .find({ url: { $in: newurlmodels.map(urlmodel => urlmodel._id) } })
        newpro = newproducts.length;
    }
    const urlmodels = await URLModel.find();
    const products = await ProductModel.find({url:{$in:urlmodels.map(urlmodel=>urlmodel._id)}}).populate({path:"url"});
    const history = await historyModel.find();
    const total = await ProductModel
        .countDocuments({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    await RequestModel.findOneAndUpdate({ url: req.url }, { state: false });
    return res.status(200).json({ success: true, data: { removed:removed.removed, new: newpro,products,total,history } })
}

const deleteData = async (req, res) => {
    try {
        await ProductModel.deleteMany({});
        await URLModel.deleteMany({});
        res.status(200).json({ success: true, message: 'All data deleted successfully.' });
    } catch (error) {
        console.error('Error occurred while deleting data:', error);
        res.status(500).json({ success: false, error: 'An error occurred while deleting data.' });
    }
}

module.exports = {
    getProduct,
    startScraping,
    deleteData

}