const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    step: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('cron', URLSchema);