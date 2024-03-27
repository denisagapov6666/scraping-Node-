const axios = require('axios');
const cheerio = require('cheerio');

const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const urlparser = url.split("?")[1].split("-")
        const urltitle = urlparser[0]
        const urlcolor = urlparser[1]
        const URL = 'https://www.adorracarpet.com/';
        const response = await axios.get(URL);
        const html = response.data;
        const $ = cheerio.load(html);

        const products = $('div.product-details');

        products.each((index, element) => {
            const productName = $(element).find('div.product-name span').first().text();
            const productSku = $(element).find('div.product-name input').first().attr('value');
            const details = $(element).find('div.specs-values span');
            const image1 = $(element).find('div.collection-product img').first().attr('src');
            const colors = $(element).find('div.product-colors-variant-images img');

            colors.each((i, img) => {
                const color = $(img).attr('data-color');
                const bigImage = $(img).attr('data-big-image');
                const imageUrls = [];
                imageUrls.push(image1, bigImage)
                if (productName === urltitle && color === urlcolor) {
                    const props = {
                        category: "carpet",
                        brandName: "Adorracarpet",
                        productSku,
                        productName: `${productName}-${color}`,
                        collection: productName,
                        color,
                        fiberType: details.eq(0).text(),
                        width: details.eq(3).text(),
                        construction: details.eq(1).text(),
                        imageUrls,
                        site: "adorra"
                    }
                    resolve(props)
                }
            });
        });
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})


module.exports = async () => {
    const site = "adorra";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}