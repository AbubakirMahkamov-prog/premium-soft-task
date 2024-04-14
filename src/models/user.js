import mongoose from "mongoose";
import db from "../db/db.js";


const userModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    address: String
})

export default db.model('users', userModel);