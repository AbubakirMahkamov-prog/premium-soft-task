import mongoose from "mongoose";
import db from "./db/db.js";

// Define the schema structure
const tempSchema = new mongoose.Schema({
    timestamp: Date,
    temp: Number
});

// Create a model based on the schema
const tempModel = db.model('weather', tempSchema);

// Define the documents to insert
// const documentsToInsert = [
//     {
//         timestamp: new Date("2021-05-18T00:00:00.000Z"),
//         temp: 12
//     },
//     {
//         timestamp: new Date("2021-05-18T04:00:00.000Z"),
//         temp: 11
//     },
//     {
//         timestamp: new Date("2021-05-18T08:00:00.000Z"),
//         temp: 11
//     },
//     {
//         timestamp: new Date("2021-05-18T12:00:00.000Z"),
//         temp: 12
//     }
// ];

// Insert documents into the collection using async/await
async function insertDocuments() {
    try {
        const insertedDocs = await tempModel.insertMany(documentsToInsert);
        console.log("Documents inserted successfully:", insertedDocs);
    } catch (error) {
        console.error("Error inserting documents:", error);
    }
}

// Call the function to insert documents
insertDocuments();
