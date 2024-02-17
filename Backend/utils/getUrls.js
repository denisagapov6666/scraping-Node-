const axios = require('axios');
const cheerio = require('cheerio');
const URLModel = require('../models/URLModel');

module.exports = async () => {
    console.log("Get Urls:");
    try {
        // Fetch URLs from the homepage
        const URL = "https://www.prestigemills.com/products-collection.html";
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);
        const links = $(".product-feature .product-link");
        
        if (links.length > 0) {
            const urlsInLinks = links.toArray().map(element => $(element).attr('href'));
            
            // Check and update URLs in the database
            await checkUrl(urlsInLinks);
            // const test = [
            // "https://www.prestigemills.com/wallace-tartan"];
            // await checkUrl(test);
        }
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
    console.log("End getting Urls:**")
};

async function checkUrl(newUrls) {
    try {
        const allUrlModels = await URLModel.find();
        const allUrls = allUrlModels.map(urlModel => urlModel.url);
        
        const removedUrls = allUrls.filter(url => !newUrls.includes(url));
        const addedUrls = newUrls.filter(url => !allUrls.includes(url));

        // Update existing URLs in the database
        await Promise.all(allUrlModels.map(async urlModel => {
            if (removedUrls.includes(urlModel.url)) {
                await URLModel.findByIdAndUpdate(urlModel._id, { new: false, deleted: true });
            } else {
                await URLModel.findByIdAndUpdate(urlModel._id, { new: false });
            }
        }));

        // Add new URLs to the database
        await Promise.all(addedUrls.map(async url => {
            const newUrlModel = new URLModel({
                url,
                deleted: false,
            });
            await newUrlModel.save();
        }));
    } catch (error) {
        console.error('Error updating URLs in database:', error);
    }
}
