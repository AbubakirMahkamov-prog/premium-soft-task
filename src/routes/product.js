import joiMiddleware from "../middlewares/joi.middleware.js";
import Router from "koa-router";
import productSchema from "../middlewares/validators/productValidor.js";
import ProductController from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import { roles } from "../utils/roles.js";
const productController = new ProductController();
const userRouter = new Router({ prefix: '/product' });

userRouter.post("/", auth(roles.Admin), joiMiddleware(productSchema), productController.create)
userRouter.patch("/:id", auth(roles.Admin), joiMiddleware(productSchema), productController.update)
userRouter.get("/", productController.getAll)
userRouter.get("/:id", productController.getOne)

export default userRouter;
