import  Koa from 'koa'
import logger from 'koa-logger'
import { Server }  from 'socket.io'


const app = new Koa();

let server = app.listen(PORT, () => {
    console.log(`App running on ${PORT} 🚀`)
});
