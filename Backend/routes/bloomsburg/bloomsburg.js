const express = require("express");
const bloomsburgController = require("../../controllers/bloomsburg")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/bloomsburg");
const router = express.Router();

router.get("/get_products_info", bloomsburgController.getProduct);
router.post("/cron", bloomsburgController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser,bloomsburgController.startScraping)

// cronJob.bloomsburgCronJob();

module.exports = router;