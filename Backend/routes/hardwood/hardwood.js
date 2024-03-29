const express = require("express");
const hardwoodController = require("../../controllers/hardwood")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/hardwood");
const router = express.Router();

router.get("/get_products_info", hardwoodController.getProduct);
router.post("/cron", hardwoodController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, hardwoodController.startScraping)


// cronJob.hardwoodCronJob();

module.exports = router;