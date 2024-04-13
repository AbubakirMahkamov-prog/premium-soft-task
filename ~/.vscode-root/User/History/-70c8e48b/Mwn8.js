import mongoose from "mongoose";
import { config } from "../starters/config.js";

const db = mongoose.createConnection(config.DB_CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})

export default db;


