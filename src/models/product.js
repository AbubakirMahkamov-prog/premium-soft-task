import mongoose from "mongoose";
import db from "../db/db.js";


const productModel = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        index: true
    },
    color: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    }
})

export default db.model('products', productModel);