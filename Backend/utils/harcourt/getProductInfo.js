const axios = require("axios")
const cheerio = require('cheerio');
const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const productName = $('.catalog-details-title').text().replace(/\t|\n|\s{2,}/g, ' ');
        const fiberType = $('.catalog-details-spec-value').eq(0).text().trim();
        const construction = $('.catalog-details-spec-value').eq(1).text().trim();
        const width = $('.catalog-details-spec-value').eq(2).text().trim();
        const origin = $('.catalog-details-spec-value').eq(4).text().trim();
        const patternRepeat = $('.catalog-details-spec-value').eq(5).text().trim() || '';

        const variants = $('div.catalog-details-color-thumbs div.color-selector');
        const data = [];
        variants.each((index, element) => {
            const color = $(element).attr('data-color');
            const imageUrls = $(element).attr('data-color-url');
            const props = {
                category:"carpet", 
                brandName:"Harcourt",
                productSku:productName + " "+color, 
                productName:productName + ' ' + color,
                collection: "Harcourt", 
                color, 
                fiberType, 
                construction, 
                origin, 
                width, 
                patternRepeat, 
                imageUrls,
                site:"harcourt"
            };
            data.push(props); // Output the props array
        });
        resolve(data)

    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})
module.exports = async() => {
    const site = "harcourt";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}
