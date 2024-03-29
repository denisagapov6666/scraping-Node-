const express = require("express");
const fabricaController = require("../../controllers/fabrica")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/fabrica");
const router = express.Router();

router.get("/get_products_info", fabricaController.getProduct);
router.post("/cron", fabricaController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, fabricaController.startScraping)


// cronJob.fabricaCronJob();

module.exports = router;