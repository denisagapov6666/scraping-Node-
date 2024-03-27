const axios = require('axios');
const cheerio = require('cheerio');
const {mainGetProducts} = require("../MainGetProducts");

const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        
        const collection = url.split("/")[4].replace("-"," ").toUpperCase();
        let texture = "";
        let fiberType = "";
        let width = "";
        let patternRepeat = "";
        let origin = "";
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        $('.wixui-rich-text__text').each((index, element) => {
            const detailTitle = $(element).text().trim();
            
            if (detailTitle.startsWith("Type:")) {
                texture = detailTitle.split(":")[1].trim();
            }
            if (detailTitle.startsWith("Fiber Content")) {
                fiberType = detailTitle.split(":")[1].trim();
            }
            if (detailTitle.startsWith("Max Broadloom Width:")) {
                width = detailTitle.split(":")[1].trim();
            }else if(detailTitle.startsWith("Width:")){
                width = detailTitle.split(":")[1].trim();
            }
            if (detailTitle.startsWith("Country Of Origin:")) {
                origin = detailTitle.split(":")[1].trim();
            }
            if (detailTitle.startsWith("Pattern Repeat:")) {
                patternRepeat = detailTitle.split(":")[1].trim();
            }else if(detailTitle.startsWith(capitalizeFirstLetter(collection.toLowerCase())+":")){
                patternRepeat = detailTitle.split(":")[1].trim();

            }
        });
        
        let products = []
        const colors = $('.gallery-item-container');
        let except1 = false;
        for (let index = 0; index < colors.length; index++) {
            const element = colors.eq(index);
            if (except1 && index === 0) return;
            const img = $(element).find('picture img').eq(0);
            const tag = $(element).find('.gallery-item-common-info-outer').eq(0).text().trim() || img.attr('alt');
            const props = {
                category:"carpet", 
                brandName:"Rebel", 
                productName:`${collection}-${tag}`,
                collection, 
                color:tag,
                origin,
                texture,
                fiberType,
                patternRepeat,
                width,
                site:"rebel",
                imageUrls:[`${img.attr('src').split('.jpg')[0]}.jpg`]
            }
            products.push(props)
            if (index === colors.length - 1) resolve(products);
        }
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})

module.exports = async() => {
    const site = "rebel";
    await mainGetProducts(site,scrapeData);
}