const express = require("express");
const mohawkController = require("../../controllers/mohawk")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/mohawk");
const router = express.Router();

router.get("/get_products_info", mohawkController.getProduct);
router.post("/cron", mohawkController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, mohawkController.startScraping)


// cronJob.mohawkCronJob();

module.exports = router;