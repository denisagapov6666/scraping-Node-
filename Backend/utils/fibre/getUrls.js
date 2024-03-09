const axios = require('axios');
const cheerio = require('cheerio');
const URLModel = require('../../models/fibre/URLModel');
const ProductModel = require('../../models/fibre/ProductModel');
const HistoryModel = require("../../models/fibre/history");
const checkUrl = (newUrls) => new Promise(async (resolve, reject) => {
    try {
        const allUrlModels = await URLModel.find();
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
            await URLModel.updateMany({new:true},{$set: { new: false }});
            // Add new URLs to the database
            await Promise.all(addedUrls.map(async url => {
                const newUrlModel = new URLModel({
                    url,
                    deleted: false,
                });
                await newUrlModel.save();
            }));

        }
        await new HistoryModel({history:"#"}).save()


        resolve({removed:removedProductsLength,isremoved:removedUrls.length,isadded:addedUrls.length})
    } catch (error) {
        console.error('Error updating URLs in database:', error);
    }
})
module.exports = async () => {
    console.log("Get Urls:");
    try {
        // Fetch URLs from the homepage
        const URL = "https://fibreworks.com/collections-fibreworks/";
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);
        const links = $(".collections__colors .color__item .cover");
        console.log(links)

        if (links.length > 0) {
            const urlsInLinks = links.toArray().map(element => $(element).attr('href'));

            // Check and update URLs in the database
            const data = await checkUrl(urlsInLinks);
            return data;
            // const test = [
            // "https://www.prestigemills.com/wallace-tartan"];
            // await checkUrl(test);
        }
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
    console.log("End getting Urls:**")
};

