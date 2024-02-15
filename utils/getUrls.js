const axios = require('axios');
const cheerio = require('cheerio');
const URLModel = require('../models/URLModel');

module.exports = async () => {
    console.log("Get Urls:");
    // new && removed product url checking and saving
    const checkUrl = async (newUrls) => {
        const allUrlModels = await URLModel.find();
        const allUrls = allUrlModels.map(url => url.url)
        const removedUrls = allUrls.filter(url => !newUrls.includes(url));
        const addedUrls = newUrls.filter(url => !allUrls.includes(url));

        addedUrls.forEach(async url => {
            const newUrlModel = new URLModel({
                url,
                deleted: false,
                new: true
            })
            await newUrlModel.save()
        });

        allUrlModels.forEach(async urlModel => {
            if (removedUrls.includes(urlModel.url)) {
                await User.findByIdAndUpdate(urlModel._id, { new: false, deleted: true })
            } else {
                await User.findByIdAndUpdate(urlModel._id, { new: false })
            }
        })
    }

    // url scraping from homepage
    const URL = "https://www.prestigemills.com/products-collection.html";

    try {
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);
        const links = $(".product-feature .product-link");
        if (links.length > 0) {
            const urlsInLinks = [];
            let text = "";
            links.each((index, element) => {
                const url = $(element).attr('href');
                text += url + "\n";
                if (!urlsInLinks.includes(url)) {
                    urlsInLinks.push(url)
                }
            });
            checkUrl(urlsInLinks);
        }
    } catch (error) {
        console.error('Error fetching Urls:', error);
    }
}