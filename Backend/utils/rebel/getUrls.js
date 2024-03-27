const axios = require('axios');
const cheerio = require('cheerio');
const { checkUrl } = require("../MainCheckUrls");
const site = "rebel";
module.exports = async () => {
    console.log("Get Urls:");
    try {
        // Fetch URLs from the homepage
        const URL = "https://www.rebelcarpets.com/collections";
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data)
        const collectionNames = $("div.info-member.info-element-title span")

        const urls = []
        if (collectionNames.length > 0) {
            for (let i = 0; i < collectionNames.length; i++) {
                const collectionUrl = collectionNames.eq(i).text().replace(" ", "-");
                urls.push("https://www.rebelcarpets.com/collections/" + collectionUrl.toLowerCase());
            }
        }
        const data = await checkUrl(site, urls);
        return data;
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
    console.log("End getting Urls:**")
};

