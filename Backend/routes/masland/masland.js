const express = require("express");
const maslandController = require("../../controllers/masland")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/masland");
const router = express.Router();

router.get("/get_products_info", maslandController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, maslandController.startScraping)


// cronJob.maslandCronJob();

module.exports = router;