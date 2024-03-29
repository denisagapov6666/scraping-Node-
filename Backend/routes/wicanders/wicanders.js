const express = require("express");
const wicandersController = require("../../controllers/wicanders")
const prestigeMiddleware = require("../../middlewares/prestige")
// const cronJob = require("../../cron/wicanders");
const router = express.Router();

router.get("/get_products_info", wicandersController.getProduct);
router.post("/cron", wicandersController.cron);

router.get("/start_scraping", prestigeMiddleware.isScrapingByOtherUser, wicandersController.startScraping)


// cronJob.wicandersCronJob();

module.exports = router;