require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log("MongoDB connected successfully with Mongoose!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = { connectDB };
