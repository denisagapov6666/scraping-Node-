const express = require('express');
const prestigeRoute = require('./prestige/prestige');
const couristanRoute = require('./couristan/couristan');
const fibreRoute = require('./fibre/fibre');
const kayaRoute = require('./kaya/kaya');
const bloomsburgRoute = require('./bloomsburg/bloomsburg');
const harcourtRoute = require('./harcourt/harcourt');
const nourisonRoute = require('./nourison/nourison');
const kaleenRoute = require('./kaleen/kaleen');
const fabricaRoute = require('./fabrica/fabrica');
const dixieRoute = require('./dixie/dixie');
const maslandRoute = require('./masland/masland');
const andersontuftexRoute = require('./andersontuftex/andersontuftex');

const app = express();
app.use("/prestige",prestigeRoute);
app.use("/couristan",couristanRoute)
app.use("/fibreworks",fibreRoute)
app.use("/kaya",kayaRoute)
app.use("/bloomsburg",bloomsburgRoute)
app.use("/harcourt",harcourtRoute)
app.use("/nourison",nourisonRoute)
app.use("/kaleen",kaleenRoute)
app.use("/fabrica",fabricaRoute)
app.use("/dixie",dixieRoute)
app.use("/masland",maslandRoute)
app.use("/andersontuftex",andersontuftexRoute)
module.exports = app;


