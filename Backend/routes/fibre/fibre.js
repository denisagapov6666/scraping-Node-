const express = require("express");
const fibreController = require("../../controllers/fibre")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/fibre");
const router = express.Router();

router.get("/get_products_info", fibreController.getProduct);
router.post("/cron", fibreController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, fibreController.startScraping)


// cronJob.fibreCronJob();

module.exports = router;