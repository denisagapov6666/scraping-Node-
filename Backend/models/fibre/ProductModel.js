const mongoose= require("mongoose");
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    url: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "fibreUrls"
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
    design:{
        type:String
    },
    price:{
        type:String
    },
    fiberType: {
        type: String
    },
    construction: {
        type: String
    },
    pattern: {
        type: String
    },
    patternRepeat: {
        type: String
    },
    hight: {
        type: String
    },
    width: {
        type: String,
    },
    fiberComposition:{
        type:String
    },
    usage: {
        type: String
    },
    warranty: {
        type: String
    },
    style: {
        type: String
    },
    backing: {
        type: String
    },
    construction: {
        type: String
    },
    imageUrls: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('fibreProducts', ProductSchema);