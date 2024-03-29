const mongoose= require("mongoose");
const Schema = mongoose.Schema
const ProductSchema = new Schema({
    url: {
        type: Schema.Types.ObjectId,
        ref: "urls"
    },
    site: {
        type: String
    },
    category: {
        type: String
    },
    brandName: {
        type: String
    },
    stainTreatment: {
        type: String
    },
    productSku: {
        type: String
    },
    thickness:{
        type:String
    },
    dimension:{
        type:String
    },
    bevel:{
        type:String
    },
    finishing:{
        type:String
    },
    lockingSystem:{
        type:String
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
    fiberComposition:{
        type:String
    },
    family: {
        type: String
    },
    pile:{
        type:String
    },
    pattern: {
        type: String
    },
    texture: {
        type: String
    },
    origin: {
        type: String
    },
    patternRepeat: {
        type: String
    },
    height: {
        type: String
    },
    width: {
        type: String,
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
    weight: {
        type: String
    },
    usage: {
        type: String
    },
    repeat:{
        type:String
    },
    warranty: {
        type: String
    },
    style: {
        type: String
    },
    weave: {
        type: String
    },
    yarn: {
        type: String
    },
    fireRating: {
        type: String
    },
    backing: {
        type: String
    },
    construction: {
        type: String
    },
    finish: {
        type: String
    },
    coverage: {
        type: String
    },
    feature:{
        type:String
    },
    installMethod:{
        type:String
    },
    removed: {
        type: Boolean,
    },
    new: {
        type: Boolean,
    },
    imageUrls: [
        {
            type: String
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('products', ProductSchema);