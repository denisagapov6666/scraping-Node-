const express = require("express");
const kayaController = require("../../controllers/kaya")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/kaya");
const router = express.Router();

router.get("/get_products_info", kayaController.getProduct);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, kayaController.startScraping)


// cronJob.kayaCronJob();

module.exports = router;