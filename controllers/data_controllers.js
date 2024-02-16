const ProductModel = require('../models/ProductModel');

exports.getAllData = (req, res) => {
    ProductModel.find()
        .populate('url') // Assuming there's a field 'url' in ProductModel that references URLModel
        .then((allProduct) => res.json(allProduct))
        .catch((err) => res.status(404)
            .json({ message: 'Data not found', error: err.message }));
}