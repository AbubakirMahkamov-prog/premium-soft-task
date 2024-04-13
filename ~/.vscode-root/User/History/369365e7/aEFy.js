import  Koa from 'koa'
import logger from 'koa-logger'
import { Server }  from 'socket.io'
import  config from "./starters/config.js";

const app = new Koa();

let server = app.listen(config.PORT, () => {
    console.log(`App running on ${PORT} 🚀`)
});
