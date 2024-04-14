import joiMiddleware from "../middlewares/joi.middleware.js";
import Router from "koa-router";
import orderSchema from "../middlewares/validators/orderValidator.js";
import OrderController from "../controllers/orderController.js";
import auth from "../middlewares/auth.js";
import { roles } from "../utils/roles.js";
const orderController = new OrderController();
const orderRouter = new Router({ prefix: '/order' });

orderRouter.post("/", auth(roles.Admin), joiMiddleware(orderSchema), orderController.create)
orderRouter.patch("/:id", auth(roles.Admin), joiMiddleware(orderSchema), orderController.update)
orderRouter.get("/", auth(), orderController.getAll)
orderRouter.get("/:id", auth(), orderController.getOne)

export default orderRouter;
