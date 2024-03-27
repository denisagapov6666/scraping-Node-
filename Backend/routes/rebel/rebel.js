const express = require("express");
const rebelController = require("../../controllers/rebel")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/rebel");
const router = express.Router();

router.get("/get_products_info", rebelController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, rebelController.startScraping)


// cronJob.rebelCronJob();

module.exports = router;