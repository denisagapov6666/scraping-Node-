const express = require('express');
const prestigeRoute = require('./prestige/prestige');

const app = express();
app.use("/prestige",prestigeRoute);
module.exports = app;


