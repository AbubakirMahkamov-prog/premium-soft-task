import mongoose from "mongoose";
import db from "../db/db.js";


const projectModel = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        index: true
    },
    logo: {
        type: String,
    },
    url: {
        type: String,
    }
})

export default db.model('projects', projectModel);