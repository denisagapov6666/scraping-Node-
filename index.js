const express =  require('express');
const mongoose = require("mongoose");
const getProductInfo = require('./utils/getProductInfo');
const getUrls =  require('./utils/getUrls');

const app = express();
const PORT = process.env.PORT || 8081;

mongoose.connect('mongodb://localhost:27017/scrap-data')
    .then(() => {
        console.log('Connected to MongoDB');
        const mainAction = async () => {
            await getUrls();
            await getProductInfo();
        }
        mainAction();
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
