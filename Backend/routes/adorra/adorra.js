const express = require("express");
const adorraController = require("../../controllers/adorra")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/adorra");
const router = express.Router();

router.get("/get_products_info", adorraController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser,adorraController.startScraping)

// cronJob.adorraCronJob();

module.exports = router;