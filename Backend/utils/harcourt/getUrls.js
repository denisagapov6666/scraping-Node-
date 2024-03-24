const axios = require('axios');
const cheerio = require('cheerio');
const {checkUrl} = require("../MainCheckUrls");
const site = "harcourt";

module.exports = async () => {
    console.log("Get Urls:");
    try {
        // Fetch URLs from the homepage
        const URL = "https://harcourtcollection.com/carpet/";
        const response = await axios.get(URL);
        const $ = cheerio.load(response.data);
        const links = $(".catalog-item a");

        if (links.length > 0) {
            const urlsInLinks = links.toArray().map(element =>"https://harcourtcollection.com/carpet/"+$(element).attr('href'));
            // Check and update URLs in the database
            const data = await checkUrl(site,urlsInLinks);
            return data;
            // const test = [
            // "https://www.prestigemills.com/wallace-tartan"];
            // await checkUrl(test);
        }
    } catch (error) {
        console.error('Error fetching URLs:', error);
    }
    console.log("End getting Urls:**")
};

