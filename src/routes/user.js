import joiMiddleware from "../middlewares/joi.middleware.js";
import Router from "koa-router";
import userSchema from "../middlewares/validators/userValidator.js";
import UserController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
import { roles } from "../utils/roles.js";
const userController = new UserController();
const userRouter = new Router({ prefix: '/user' });

userRouter.post("/", auth(roles.Admin), joiMiddleware(userSchema.create), userController.create)
userRouter.patch("/:id", auth(roles.Admin), joiMiddleware(userSchema.update), userController.update)
userRouter.get("/", userController.getAll)
userRouter.get("/:id", userController.getOne)

export default userRouter;
