const express = require("express");
const harcourtController = require("../../controllers/harcourt")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/harcourt");
const router = express.Router();

router.get("/get_products_info", harcourtController.getProduct);
router.post("/cron", harcourtController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, harcourtController.startScraping)


// cronJob.harcourtCronJob();

module.exports = router;