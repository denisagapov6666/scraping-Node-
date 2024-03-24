const axios = require('axios');
const cheerio = require('cheerio');

const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract data using Cheerio selectors
        const skuElement = $('[data-th="Sku"]').first();
        const productSku = skuElement ? skuElement.text().trim().replace(/\s+/g, '') : '';

        const nameElement = $('.page-title');
        const productName = nameElement ? nameElement.text().trim().replace(/\t|\n|\s{2,}/g, ' ') : '';

        const altText = $('.product.attribute.overview .value img').attr('alt');
        const brandName = altText ? altText.split(' ')[0] : ''; // Add error handling to ensure altText has a value


        const collectionElement = $('.collection-title');
        const collection = collectionElement ? collectionElement.text().trim() : '';

        const rollWidthElement = $('.broadloom-custom-size--container .roll-width').text().trim();
        const rollWidth = rollWidthElement ? rollWidthElement.split(':')[1].trim() : '';

        const pileElement = $('.specs-data:contains("Pile Description")');
        const pile = pileElement.length > 0 ? pileElement.text().split(':')[1].trim() : '';

        const patternRepeatElement = $('.specs-data:contains("Pattern Repeat")');
        const patternRepeat = patternRepeatElement.length > 0 ? patternRepeatElement.text().split(':')[1].trim() : '';

        const fiberTypeElement = $('.specs-data:contains("Material")');
        const fiberType = fiberTypeElement.length > 0 ? fiberTypeElement.text().split(':')[1].trim() : '';

        const weightElement = $('.specs-data:contains("Face Weight")');
        const weight = weightElement.length > 0 ? weightElement.text().split(':')[1].trim() : '';

        const usageElement = $('.specs-data:contains("Applications")');
        const usage = usageElement.length > 0 ? usageElement.text().split(':')[1].trim() : '';

        const constructionElement = $('.specs-data:contains("Construction")');
        const construction = constructionElement.length > 0 ? constructionElement.text().split(':')[1].trim() : '';

        const originElement = $('.specs-data:contains("Country of Manufacture")');
        const origin = originElement.length > 0 ? originElement.text().split(':')[1].trim() : '';

        const scriptTag = $('script:contains("mage/gallery/gallery")').first();

        // Extract the content of the script tag
        const scriptContent = scriptTag.html();

        // Extract image URLs from the script content
        const matches = scriptContent.match(/"full":"(.*?)"/g);
        const imageUrls = matches ? matches.map(match => match.replace('"full":"', '').replace('"', '')) : [];


        const props = {
            category: "carpet",
            brandName,
            productSku,
            productName,
            collection,
            rollWidth,
            patternRepeat,
            pile,
            fiberType,
            weight,
            usage,
            construction,
            origin,
            imageUrls,
            site: "nourison"
        };
        resolve(props);
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})


module.exports = async () => {
    const site = "nourison";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}