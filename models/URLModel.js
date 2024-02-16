const mongoose= require("mongoose");

const URLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        required: true
    },
    new: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('URL', URLSchema);