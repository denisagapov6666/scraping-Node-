const mongoose = require("mongoose");

const connectDB = async() => {
    mongoose.connect('mongodb+srv://denisagapov6666:ot7b4bwyk6QOAvuz@cluster0.yksarw0.mongodb.net/')
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
}
module.exports = connectDB;