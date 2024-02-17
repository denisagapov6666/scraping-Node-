const express = require('express');
const ProductModel = require('../models/ProductModel');
const URLModel = require('../models/URLModel');

const router = express.Router();

const filters = {
    all: {},
    deleted: {
        deleted: true
    },
    new: {
        new: true
    }
}

router.get("/get_products_info", async (req, res) => {
    const current = req.query.current;
    const pageSize = req.query.pageSize;
    const filter = req.query.filter;

    const availableUrlModels = await URLModel.find(filters[filter])
    const availableUrls = availableUrlModels.map(availableUrlModel => availableUrlModel._id)

    const products = await ProductModel
        .find({ url: { $in: availableUrls } })
        .skip(Number(pageSize) * Number(current - 1))
        .populate('url')
        .limit(pageSize);

    const total = await ProductModel.countDocuments({ url: { $in: availableUrls } })
    return res.status(200).json({ success: true, products, total })
})

module.exports = router;