const axios = require("axios")
const cheerio = require('cheerio');
const mainGetProducts = require("../MainGetProducts");

const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const productSku = $('button.roomvo-stimr').data('sku');
        const style = $('#specification-Style').eq(0).text().trim();
        const color = $('#specification-Color').eq(0).text().trim();
        const fiberType = $('#specification-Fiber').eq(0).text().trim();
        const width = $('#specification-Width').eq(0).text().trim();
        const backing = $('#specification-Backing').eq(0).text().trim();
        const collection = $('#specification-Collection').eq(0).text().trim();

        const productDetails = $("div[tab='product-details'] div.mb-15")
        const productName = productDetails.eq(0).text().trim().replace(".","");
        const productDescription = productDetails.eq(1).text().trim();

        const images = $('a.image-link');
        const imageUrls = [];
        images.each((index, img) => {
            const imageUrl = $(img).attr('href');
            imageUrls.push(imageUrl.startsWith('http') ? imageUrl : "https:" + imageUrl);
        });
        const props = {
            category:"Carpets",
            brandName:"Anderson Tuftex Carpet",
            productSku,
            productName,
            productDescription,
            collection,
            color,
            style,
            fiberType,
            width,
            backing,
            site:"andersontuftex",
            imageUrls
        };


        resolve(props)
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})
module.exports = async() => {
    const site = "andersontuftex";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}
