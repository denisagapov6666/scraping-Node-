const express = require("express");
const fibreController = require("../../controllers/fibre")
const prestigeMiddleware = require("../../middlewares/prestige")
const cronJob = require("../../cron/fibre");
const router = express.Router();

router.get("/get_products_info", fibreController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, fibreController.startScraping)

router.get("/delete_data", fibreController.deleteData);

cronJob.fibreCronJob();

module.exports = router;