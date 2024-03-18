const axios = require('axios');
const cheerio = require('cheerio');
const mainGetProducts = require("../MainGetProducts");

const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const productSku = $('.title-group p').first().text();
        const productName = $('.title-group h1').first().text().replace(/\n\t/g, "");
        const color = $('.title-group h2').first().text();
        const propArr = $('.match p');
        const brandName = $(propArr[0]).text().split(":")[1]; //brand
        const pile = $(propArr[1]).text().split(":")[1]; //pile
        const construction = $(propArr[2]).text().split(":")[1].replace(/\t\t/g, ""); //construction
        const width = $(propArr[3]).text().split(":")[1]; //width      
        const repeat = $(propArr[4]).text().split(":")[1]; //repeat
       
        const productDescription =  $('.padding-left').contents().filter(function() {
            return this.nodeType === 3;
        }).text().trim();
        const imageUrls = [];
        const images = $('img.zoom');
        images.each((index, element) => {
            imageUrls.push($(element).attr('src'));
        });
        const props = {
            site:"couristan",
            category: "CARPET",
            brandName,
            productSku,
            productName,
            color,
            pile,
            construction,
            width,
            repeat,
            productDescription,
            usage : "",
            price : "",
            imageUrls
        };
        resolve(props);
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})

module.exports = async() => {
    const site = "couristan";
    await mainGetProducts.mainGetProducts(site,scrapeData);
}
