let isScraping = false;
const isScrapingByOtherUser = async (req, res, next) => {
    if (isScraping) {
        return res.status(200).json({ success: false, message: 'Other User is scraping now! Please wait!' });
    }
    isScraping = true;
    await next();
    isScraping = false;
}
module.exports = {
    isScrapingByOtherUser
}