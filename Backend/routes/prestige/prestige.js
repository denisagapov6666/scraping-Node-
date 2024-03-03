const express = require("express");
const prestigeController = require("../../controllers/prestige")
const prestigeMiddleware = require("../../middlewares/prestige")
const cronJob = require("../../cron/prestige");
const router = express.Router();

router.get("/get_products_info", prestigeController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, prestigeController.startScraping)

router.get("/delete_data", prestigeController.deleteData);

cronJob.prestigeCronJob();

module.exports = router;