const axios = require('axios');
const cheerio = require('cheerio');
const {checkUrl} = require("../MainCheckUrls");
const site = "bloomsburg";
module.exports = async () => {
    let pageIndex = 1;
    const urls = [];
    console.log("Get Urls:");
    try {
        while (true) {
            const URL = `https://bloomsburgcarpet.com/products-list/page/${pageIndex}`;
            const response = await axios.get(URL);
            
            // Check if response status is 404
            if (response.status === 404) {
                console.log(`Page ${pageIndex} not found. Exiting loop.`);
                break;
            }
            
            const $ = cheerio.load(response.data);
            const links = $(".fl-post-add-to-cart a");

            if (links.length > 0) {
                links.each((index, element) => {
                    const url = $(element).attr('href');
                    urls.push(url);
                });
                pageIndex++;
            } else {
                break;
            }
        }
    } catch (error) {
        console.error('Error fetching URLs:');
    }
    return await checkUrl(site,urls)
};

