const axios = require('axios');
const cheerio = require('cheerio');
const URLModel = require('../../models/kaya/URLModel');
const Product = require('../../models/kaya/ProductModel');

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

module.exports = () => {
    console.log('Get Product Info:');
    return new Promise(async resolve => {
        try {
            const allUrlModels = await URLModel.find({ new: true });
            let count = 0;

            const scrapingOneUrl = (i) => {
                scrapeData(allUrlModels[i].url).then(async product => {
                    const newProduct = new Product({ ...product, url: allUrlModels[i]._id });
                    await newProduct.save().then(() => console.log(`${++count} product is saved.`));
                  
                    if (i < allUrlModels.length-1) {
                        scrapingOneUrl(i + 1);
                    } else {
                        resolve();
                    }

                });
            }
            if (allUrlModels.length > 0) {
                scrapingOneUrl(0);
            } else {
                console.log("end");
                resolve();
            }
        } catch (error) {
            console.log("Error fetching URL:", error);
        }
    })
}
