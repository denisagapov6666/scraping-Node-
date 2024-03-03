const express = require('express');
const prestigeRoute = require('./prestige/prestige');
const couristanRoute = require('./couristan/couristan');

const app = express();
app.use("/prestige",prestigeRoute);
app.use("/couristan",couristanRoute)
module.exports = app;


