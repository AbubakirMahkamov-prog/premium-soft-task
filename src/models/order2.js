import mongoose from "mongoose";
import db from "../db/db.js";


const order2Model = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['new', 'accepted', 'done'],
        default: 'new',
    },
    client_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'clients',
    },
    project_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'projects',
    },
})

export default db.model('orders2', order2Model);