import  Koa from 'koa'
import logger from 'koa-logger'
import { Server }  from 'socket.io'
import { config } from "./starters/config.js";
import { mainRouter } from "./starters/routes.js";
const app = new Koa();
mainRouter(app)
let server = app.listen(config.PORT, () => {
    console.log(`App running on ${config.PORT} 🚀`)
});
