import mongoose from "mongoose";
import db from "../db/db.js";


const clientModel = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    phone: {
        type: String,
        unique: true,
        index: true
    },
    address: {
        type: String,
    }
})

export default db.model('clients', clientModel);