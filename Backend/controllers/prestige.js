const ProductModel = require('../models/prestige/ProductModel');
const URLModel = require('../models/prestige/URLModel');

const getProductInfo = require('../utils/prestige/getProductInfo');
const getUrls = require('../utils/prestige/getUrls');



const getProduct = async (req, res) => {
    const urlmodels = await URLModel.find();
    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
        .populate({ path: 'url' });
    const total = await ProductModel
        .countDocuments({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    return res.status(200).json({ success: true, products, total })
}

const startScraping = async (req, res) => {
    const removed = await getUrls();
    await getProductInfo();
    const urlmodels = await URLModel.find({ new: true });
    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    return res.status(200).json({ success: true, data: { removed, new: products.length } })
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