const URLModel = require('../models/urls');
const ProductModel = require('../models/products');
const HistoryModel = require("../models/history");
const checkUrl = (site,newUrls) => new Promise(async (resolve, reject) => {
    try {
        const allUrlModels = await URLModel.find({site});
        const allUrls = allUrlModels.map(urlModel => urlModel.url);

        const removedUrls = allUrls.filter(url => !newUrls.includes(url));
        const addedUrls = newUrls.filter(url => !allUrls.includes(url));

        let removedProductsLength = 0;
        if(removedUrls.length>0){
            // Update existing URLs in the database
            await Promise.all(allUrlModels.map(async urlModel => {
                if (removedUrls.includes(urlModel.url)) {
                    const products = await ProductModel.find({ url: urlModel._id });
                    removedProductsLength += products.length;
                    await URLModel.findByIdAndUpdate(urlModel._id, { new: false, deleted: true });
                }
            }));
        }
        if(addedUrls.length>0){
            await URLModel.updateMany({site,new:true},{$set: { new: false }});
            // Add new URLs to the database
            await Promise.all(addedUrls.map(async url => {
                const newUrlModel = new URLModel({
                    site,
                    url,
                    deleted: false,
                });
                await newUrlModel.save();
            }));

        }
        await new HistoryModel({site}).save()


        resolve({removed:removedProductsLength,isremoved:removedUrls.length,isadded:addedUrls.length})
    } catch (error) {
        console.error('Error updating URLs in database:', error);
    }
})
module.exports = {
    checkUrl
}