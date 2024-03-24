const express = require("express");
const couristanController = require("../../controllers/couristan")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/couristan");
const router = express.Router();

router.get("/get_products_info", couristanController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser,couristanController.startScraping)

// cronJob.couristanCronJob();

module.exports = router;