import * as Koa from "koa";
import bodyParser from "koa-bodyparser";
import Session from 'koa-session';
import cors from 'koa-cors';
import { config } from "./config.js";
//routers
import userRouter  from "../routes/user.js";
import productRouter  from "../routes/product.js";
import authRouter from "../routes/auth.js";
export async function mainRouter (app) {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ["POST", "GET", "PATCH"]
    }))
    //session config
    app.keys = [
        config.SESSION_KEY ? config.SESSION_KEY: ''
    ]
    app.use(Session(app));  
    app.use(bodyParser())
    
    app.use(userRouter.routes())
    app.use(authRouter.routes())
    app.use(productRouter.routes())
}