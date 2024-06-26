import  Koa from 'koa'
import logger from 'koa-logger'
import { config } from "./starters/config.js";
import { mainRouter } from "./starters/routes.js";
import db from "./db/db.js";
import userModel from './models/user.js'
const app = new Koa();
mainRouter(app);
let server = app.listen(config.PORT, () => {
    console.log(`App running on ${config.PORT} 🚀`)
});




