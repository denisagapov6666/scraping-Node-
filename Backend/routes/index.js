const express = require('express');
const prestigeRoute = require('./prestige/prestige');
const couristanRoute = require('./couristan/couristan');
const fibreRoute = require('./fibre/fibre');
const kayaRoute = require('./kaya/kaya');

const app = express();
app.use("/prestige",prestigeRoute);
app.use("/couristan",couristanRoute)
app.use("/fibreworks",fibreRoute)
app.use("/kaya",kayaRoute)
module.exports = app;


