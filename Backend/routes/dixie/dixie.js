const express = require("express");
const dixieController = require("../../controllers/dixie")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/dixie");
const router = express.Router();

router.get("/get_products_info", dixieController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, dixieController.startScraping)


// cronJob.dixieCronJob();

module.exports = router;