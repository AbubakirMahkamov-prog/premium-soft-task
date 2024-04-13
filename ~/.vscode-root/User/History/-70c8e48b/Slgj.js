import mongoose from "mongoose";
import { config } from "../starters/config.js";

(async() => {
    await mongoose.connect(config.DB_CONNECTION_STRING);
})()


export default mongoose;


