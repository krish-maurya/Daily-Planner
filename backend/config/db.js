const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)

const db = mongoose.connection;
db.on('connected', () => {
    console.log("Database is connected");
} );
db.on('disconnected', () => {
    console.log("Database is disconnected");
});
db.on('error', (err) => {   
    console.log("Error in database connection", err);
});

module.exports = db;