import joiMiddleware from "../middlewares/joi.middleware.js";
import Router from "koa-router";
import productSchema from "../middlewares/validators/productValidor.js";
import ProductController from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import { roles } from "../utils/roles.js";
const productController = new ProductController();
const productRouter = new Router({ prefix: '/product' });

productRouter.post("/", auth(roles.Admin), joiMiddleware(productSchema), productController.create)
productRouter.patch("/:id", auth(roles.Admin), joiMiddleware(productSchema), productController.update)
productRouter.get("/",auth(), productController.getAll)
productRouter.get("/:id", auth(), productController.getOne)

export default productRouter;
