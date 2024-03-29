const express = require("express");
const kaleenController = require("../../controllers/kaleen")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/kaleen");
const router = express.Router();

router.get("/get_products_info", kaleenController.getProduct);
router.post("/cron", kaleenController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, kaleenController.startScraping)


// cronJob.kaleenCronJob();

module.exports = router;