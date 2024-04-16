import mongoose from "mongoose";
import db from "../db/db.js";


const userModel = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    projects: [
        {
            project_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'projects',
            },
        }
    ],
    address: String
})

export default db.model('users', userModel);