const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Request', URLSchema);