import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    url: {
        type: Schema.Types.ObjectId,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    productSku: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    collection: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    texture: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    fiber: {
        type: String,
        required: true,
    },
    construction: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
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
    images: [
        {
            type: String
        }
    ]
})

export default mongoose.model('Product', ProductSchema);