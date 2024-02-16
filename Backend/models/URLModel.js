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
    }
},{timestamps:true});

module.exports = mongoose.model('URL', URLSchema);