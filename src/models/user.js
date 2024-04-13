import mongoose from "mongoose";
import db from "../db/db.js";


const userModel = new mongoose.Schema({
    name: String,
    age: Number,
    role: String
})

export default db.model('users', userModel);