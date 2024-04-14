import joiMiddleware from "../middlewares/joi.middleware.js";
import Router from "koa-router";
import userSchema from "../middlewares/validators/userValidator.js";
// import { auth } from "../middlewares/auth";
import UserController from "../controllers/userController.js";


const userController = new UserController();
const userRouter = new Router({ prefix: '/user' });

userRouter.post("/", joiMiddleware(userSchema.create), userController.create)

export default userRouter;
