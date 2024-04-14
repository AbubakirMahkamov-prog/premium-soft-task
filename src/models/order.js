import mongoose from "mongoose";
import db from "../db/db.js";


const orderModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalSumma: {
        type: Number
    },
    totalQuantity: {
        type: Number
    },
    payment: {
        type: Number
    },
    ordered_products: [
        {
            product_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'products',
            },
            price: Number,
            amount: Number,
            summa: Number
        }
    ]
})

export default db.model('orders', orderModel);