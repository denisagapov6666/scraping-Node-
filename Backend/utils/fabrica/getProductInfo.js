const axios = require("axios")
const cheerio = require('cheerio');
const mainGetProducts = require("../MainGetProducts");

const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(url.trim());
        const $ = cheerio.load(response.data);

        const productName = $('.product-title').text().trim();
        const productDescription = $('.product-description').text().trim();
        const productSku = $('.product-sku').text().replace('SKU', '').trim();
        const collection = productName.split(" in ")[0].trim();
        const price = $('.money').text().trim();

        let style = "";
        let color = "";
        let fiberType = "";
        let construction = "";
        let width = "";
        let patternRepeat = "";
        let backing = "";
        let origin = "";

        $('.product-features__title').each((index, element) => {
            const detailTitle = $(element).text().trim();
            const detailDes = $(element).next().text().trim();

            if (detailTitle.startsWith("Style:")) {
                style = detailDes;
            }
            if (detailTitle.startsWith("Color")) {
                color = detailDes;
            }
            if (detailTitle.startsWith("Backing:")) {
                backing = detailDes;
            }
            if (detailTitle.startsWith("Country of Origin:")) {
                origin = detailDes;
            }
            if (detailTitle.startsWith("Fiber")) {
                fiberType = detailDes;
            }
            if (detailTitle.startsWith("Construction")) {
                construction = detailDes;
            }
            if (detailTitle.startsWith("Carpet")) {
                width = detailDes;
            }
            if (detailTitle.startsWith("Pattern")) {
                patternRepeat = detailDes;
            }
        });
        
        const imageUrls = [];
        $('.product-galley--image-background').each((index, element) => {
            imageUrls.push("https:" + $(element).attr('data-image'));
        });
        const props = {
            category:"Carpet",  
            brandName:"Fabrica",
            productSku, 
            productName, 
            productDescription, 
            collection, 
            color, 
            price, 
            fiberType, 
            patternRepeat, 
            origin,
            backing,
            width,
            style, 
            construction,
            site:"fabrica",
            imageUrls
        };
        resolve(props);
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})
module.exports = async() => {
    const site = "fabrica";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}
