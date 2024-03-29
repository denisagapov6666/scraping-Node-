const express = require("express");
const nourisonController = require("../../controllers/nourison")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/nourison");
const router = express.Router();

router.get("/get_products_info", nourisonController.getProduct);
router.post("/cron", nourisonController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, nourisonController.startScraping)


// cronJob.nourisonCronJob();

module.exports = router;