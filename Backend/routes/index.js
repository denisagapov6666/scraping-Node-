const express = require('express');
const ProductModel = require('../models/ProductModel');

const getProductInfo = require('../utils/getProductInfo');
const getUrls = require('../utils/getUrls');
const URLModel = require('../models/URLModel');

const router = express.Router();

let isScraping = false;

const filters = {
    all: {},
    deleted: {
        'deleted': true
    },
    new: {
        'new': true
    }
}

router.get("/get_products_info", async (req, res) => {
    const current = req.query.current;
    const pageSize = req.query.pageSize;
    const filter = req.query.filter;

    const urlmodels = await URLModel.find(filters[filter]);

    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
        .populate({ path: 'url' })
        .skip(Number(pageSize) * Number(current - 1))
        .limit(Number(pageSize));

    const total = await ProductModel
        .countDocuments({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })

    return res.status(200).json({ success: true, products, total })
})

const isScrapingByOtherUser = async (req, res, next) => {
    if (isScraping) {
        return res.status(200).json({ success: false, message: 'Other User is scraping now! Please wait!' });
    }
    isScraping = true;
    await next();
    isScraping = false;
}

router.get("/start_scraping", isScrapingByOtherUser, async (req, res) => {
    const removed = await getUrls();
    await getProductInfo();
    const urlmodels = await URLModel.find({ new: true });
    const products = await ProductModel
        .find({ url: { $in: urlmodels.map(urlmodel => urlmodel._id) } })
    

    return res.status(200).json({ success: true, data: { removed, new: products.length } })
})
router.get("/delete_data", async (req, res) => {
    try {
        // Delete all documents from ProductModel collection
        await ProductModel.deleteMany({});
        
        // Delete all documents from UrlModel collection
        await URLModel.deleteMany({});
        
        res.status(200).json({ success: true, message: 'All data deleted successfully.' });
    } catch (error) {
        console.error('Error occurred while deleting data:', error);
        res.status(500).json({ success: false, error: 'An error occurred while deleting data.' });
    }
});

module.exports = router;
