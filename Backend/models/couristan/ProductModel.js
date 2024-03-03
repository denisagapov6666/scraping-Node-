const mongoose= require("mongoose");
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    url: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "CouristanURL"
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
    color: {
        type: String
    },
    pile: {
        type: String
    },
    construction: {
        type: String
    },
    width: {
        type: String
    },
    repeat: {
        type: String
    },
    description: {
        type: String
    },
    usage:{
        type:String
    },
    price:{
        type:String
    },
    imageUrls: [
        {
            type: String
        }
    ]
})

module.exports = mongoose.model('CouristanProduct', ProductSchema);