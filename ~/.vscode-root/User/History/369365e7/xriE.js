import  Koa from 'koa'
import logger from 'koa-logger'
import { Server }  from 'socket.io'
import {  } from "./starters/config";

const app = new Koa();

let server = app.listen(PORT, () => {
    console.log(`App running on ${PORT} 🚀`)
});
