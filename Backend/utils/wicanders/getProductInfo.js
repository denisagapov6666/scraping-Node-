const axios = require('axios');
const cheerio = require('cheerio');

const mainGetProducts = require("../MainGetProducts");


const { resolve } = require('path');
const scrapeData = (url) => new Promise(async (resolve, reject) => {
    try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const productSku = $(".reference").text().trim();
    const productName = $(".product-intro-info-title").text().trim();
    const productDescription = $(".content-block--text").text().trim();
    const collection = $('a.product-intro-tab-item h2').first().text().trim().replace(/\t|\n/g, ' ').replace(/\s{2,}/g, ' ');
    const dimension = $(".dimension").text().trim();
    const thickness = $(".thickness").text().trim();
    const bevel = $(".bisel").text().trim();
    const finishing = $(".finishing").text().trim();
    const lockingSystem = $(".famDesc").text().trim();
    const usage = $(".class_of_use_residential").text().trim();
    const warranty = $(".warranty_residential").text().trim();
    const imageUrls = $("div.zoom-slider--item picture img").filter((_,element)=>$(element).attr("src")!=="https://pim.amorimflooring.com/uploads/files/images/products/wicanders/").map((_, element) => $(element).attr('src')).get();

    
    const props = {
        category:"carpet", 
        brandName:"Wicanders", 
        productSku, 
        productName, 
        productDescription, 
        thickness, 
        collection, 
        dimension, 
        bevel, 
        finishing, 
        lockingSystem, 
        warranty, 
        usage,
        imageUrls,
        site:"wicanders"
    };

    resolve(props)
    } catch (error) {
        reject(error);
        console.log('Error fetching URL:', error);
    }
})


module.exports = async () => {
    const site = "wicanders";
    await mainGetProducts.mainGetProducts(site, scrapeData);
}