const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    history: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('prestigeHistory', URLSchema);