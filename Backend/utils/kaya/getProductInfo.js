const axios = require('axios');
const cheerio = require('cheerio');

const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);

        const productSku = $(".product-sku").text().trim();
        const productName = $('.product_title').text().trim() || '';
        const productDescription = $(".woocommerce-Tabs-panel--description p").text().trim();
        const imageUrls = [];
        $('div.woocommerce-product-gallery__image a').each(function () {
            imageUrls.push($(this).attr('href'));
        });
        const props = {
            site:"kaya",
            category: "carpet",
            brandName: "kaya",
            productSku:productName+"-"+productSku,
            productName:productName+"-"+productSku,
            productDescription,
            collection:productName,
            color:productSku,
            imageUrls,
        };
        resolve(props);
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})


module.exports = async() => {
    const site = "kaya";
    await mainGetProducts.mainGetProducts(site,scrapeData);
}