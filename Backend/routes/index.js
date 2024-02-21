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

const isScrapingByOtherUser = (req, res, next) => {
    if (isScraping) {
        return res.status(503).json({ message: 'Other User is scraping now! Please wait!' });
    }
    isScraping = true;
    next();
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

module.exports = router;
