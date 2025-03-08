require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = "teste_gleyson"; // Nome do seu banco de dados

let db;

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        db = client.db(dbName);
        console.log("MongoDB connected sucessfuly!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error("MongoDB no connected.");
    }
    return db;
}

module.exports = { connectDB, getDB };
