const express = require("express");
const andersontuftexController = require("../../controllers/andersontuftex")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/andersontuftex");
const router = express.Router();

router.get("/get_products_info", andersontuftexController.getProduct);
router.post("/cron", andersontuftexController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser,andersontuftexController.startScraping)

// cronJob.andersontuftexCronJob();

module.exports = router;