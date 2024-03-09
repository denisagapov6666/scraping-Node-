const express = require('express');
const prestigeRoute = require('./prestige/prestige');
const couristanRoute = require('./couristan/couristan');
const fibreRoute = require('./fibre/fibre');

const app = express();
app.use("/prestige",prestigeRoute);
app.use("/couristan",couristanRoute)
app.use("/fibreworks",fibreRoute)
module.exports = app;


