import * as Koa from "koa";
import logger from 'koa-logger';
import helmet from 'koa-helmet';
import koaBodyParse from "koa-bodyparser";
import koaJson from "koa-json";
import Session from 'koa-session';
import cors from 'koa-cors';
import { config } from "./config.js";
//routers
import userRouter  from "../routes/user.js";
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

    app.use(async (ctx, next) => {
        // Increment visit count
        if (ctx.session) {
            ctx.session.views = (ctx.session?.views ?? 0) + 1;
        }
        await next();
    });
    // Example route
    app.use(async (ctx, next) => {
        // Access session data;
        console.log(ctx.session)
        await next()
    });
  
//session config
    app.use(koaJson())
    app.use(logger())
    app.use(koaBodyParse())
    app.use(helmet())
    app.use(userRouter.routes())
}