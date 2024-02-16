const mongoose = require("mongoose");
//scraping code
const getProductInfo = require('../utils/getProductInfo');
const getUrls =  require('../utils/getUrls');

const connectDB = async() => {
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
}
module.exports = connectDB;