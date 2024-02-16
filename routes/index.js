const express = require('express');

const router = express.Router();

const { getAllData } = require('../controllers/data_controllers');

router.get("/", getAllData);

module.exports = router;