const mongoose= require("mongoose");
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    url: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "kayaUrls"
    },
    category: {
        type: String
    },
    brandName: {
        type: String
    },
    productSku: {
        type: String
    },
    productName: {
        type: String
    },
    productDescription:{
        type:String
    },
    collection: {
        type: String
    },

    color: {
        type: String
    },
    texture: {
        type: String
    },
    style: {
        type: String
    },
    fiber: {
        type: String
    },
    construction: {
        type: String
    },
    origin: {
        type: String
    },
    width: {
        type: String
    },
    repeatWidth: {
        type: String
    },
    repeatLength: {
        type: String,
    },
    rollWidth: {
        type: String
    },
    imageUrls: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('kayaProducts', ProductSchema);