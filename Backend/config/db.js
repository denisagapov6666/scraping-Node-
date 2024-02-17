const mongoose = require("mongoose");

const connectDB = async() => {
    mongoose.connect('mongodb://localhost:27017/scrap-data')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}
module.exports = connectDB;