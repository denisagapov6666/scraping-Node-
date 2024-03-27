const express = require("express");
const shawfloorsController = require("../../controllers/shawfloors")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/shawfloors");
const router = express.Router();

router.get("/get_products_info", shawfloorsController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, shawfloorsController.startScraping)


// cronJob.shawfloorsCronJob();

module.exports = router;