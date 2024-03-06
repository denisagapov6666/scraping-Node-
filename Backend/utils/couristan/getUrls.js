const axios = require('axios');
const cheerio = require('cheerio');
const URLModel = require('../../models/couristan/URLModel');
const ProductModel = require('../../models/couristan/ProductModel');
const historyModel = require("../../models/couristan/history");

const checkUrl = async (newUrls) => {
    try {
        const allUrlModels = await URLModel.find();
        const allUrls = allUrlModels.map(urlModel => urlModel.url);

        const removedUrls = allUrls.filter(url => !newUrls.includes(url));
        const addedUrls = newUrls.filter(url => !allUrls.includes(url));

        let removedProductsLength = 0;
        if(removedUrls.length>0){
            // Update existing URLs in the database
            await Promise.all(allUrlModels.map(async urlModel => {
                if (removedUrls.includes(urlModel.url)) {
                    const products = await ProductModel.find({ url: urlModel._id });
                    removedProductsLength += products.length;
                    await URLModel.findByIdAndUpdate(urlModel._id, { new: false, deleted: true });
                }
            }));
        }
        if(addedUrls.length>0){
            await URLModel.updateMany({new:true}, {$set :{ new: false }});
            // Add new URLs to the database
            await Promise.all(addedUrls.map(async url => {
                const newUrlModel = new URLModel({
                    url,
                    deleted: false,
                });
                await newUrlModel.save();
            }));

        }
        if(addedUrls.length>0||removedUrls.length>0){
            await new historyModel({history:"#"}).save()

        }


        return {removed:removedProductsLength,isadded:addedUrls.length,isremoved:removedUrls.length};
    } catch (error) {
        console.error('Error updating URLs in database:', error);
    }
};
module.exports = async () => {
    let pageIndex = 1;
    try {
        const urls = [];
        for (let x = 0; x < 99; x++) {
            console.log('fetching page ' + pageIndex);
            const URL = "https://www.couristan.com/wp-admin/admin-ajax.php";
            const form_data = new URLSearchParams();
            form_data.append('action', 'max_filter_products');
            form_data.append('form_data', 'product_tag%3Abroadloom=&paged=' + pageIndex + '&filter-perpage=96&filter-orderby=');

            const response = await axios.post(URL, form_data);
            const $ = cheerio.load(response.data);
            const links = $("div.product-meta a");

            if (links.length > 0) {
                links.each((index, element) => {
                    urls.push($(element).attr('href'));
                });
            } else {
                break;
            }
            pageIndex++;
        }
        return checkUrl(urls)
    } catch (error) {
        console.error('Error fetching brands:', error);
    }
};

