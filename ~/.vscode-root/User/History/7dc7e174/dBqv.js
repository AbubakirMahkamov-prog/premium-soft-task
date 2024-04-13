import mongoose from "mongoose";
import db from "../db/db.js";


const userModel = new mongoose.Schema('users', {
    name: String,
    age: Number,
    role: String
})

export default userModel;