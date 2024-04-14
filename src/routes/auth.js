import Router from "koa-router";
import * as Koa from "koa";
import AuthController from "../controllers/authController.js";


const authController = new AuthController();
const authRouter = new Router({ prefix: '/auth' });

authRouter.post("/login", authController.login)
authRouter.get('/refresh', authController.refresh)
authRouter.post('/logout', authController.logout)

export default authRouter;
