const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('histories', URLSchema);