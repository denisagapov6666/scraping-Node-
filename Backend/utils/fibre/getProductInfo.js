const axios = require('axios');
const cheerio = require('cheerio');
const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        console.log($("noscript"))

        const productName = $('.product__banner-title').text().trim();
        const productSku = url.split('=')[1];
        const collection = $('li.meta__item.meta__item--collection span.meta__value span').text().trim() || '';
        const fiberType = $('li.meta__item.meta__item--fiber span.meta__value span').text().trim() || '';
        const color = $('.rio-product-option-title-option-value').text().trim() || '';
        const pattern = $('li.meta__item.meta__item--pattern span.meta__value span').text().trim() || '';
        const patternRepeat = $('li.meta__item.meta__item--pattern-repeat span.meta__value span').text().trim() || '';
        const width = $('li.meta__item.meta__item--width span.meta__value span').text().trim() || '';
        const family = $('li.meta__item.meta__item--family span.meta__value span').text().trim() || '';
        const fiberComposition = $('li.meta__item.meta__item--fiber-composition span.meta__value span').text().trim() || '';
        const backing = $('li.meta__item.meta__item--backing span.meta__value span').text().trim() || '';
        const construction = $('li.meta__item.meta__item--construction span.meta__value span').text().trim() || '';
        const productDescription = $('div.product__description p span').text().trim() || '';

        const imageUrls = [];
        const images = $('img.pwzrjss3');
        images.each(function () {
            imageUrls.push($(this).attr('src'));
        });
        const props = {
            site: "fibre",
            category: "carpet",
            brandName: "Fibreworks",
            productSku,
            productName,
            productDescription,
            collection,
            color,
            design: '',
            price: '',
            fiberType,
            pattern,
            patternRepeat,
            height: '',
            width,
            fiberComposition,
            usage: '',
            warranty: '',
            style: '',
            backing,
            family,
            construction,
            imageUrls
        };
        resolve(props);
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})

module.exports = async() => {
    const site = "fibre";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}
