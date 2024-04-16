import Router from "koa-router";
import Order2Controller from "../controllers/order2Controller.js";
import auth from "../middlewares/auth.js";
const order2Controller = new Order2Controller();
const order2Router = new Router({ prefix: '/order2' });

order2Router.get("/users-with-new", order2Controller.getAllUserWithNewOrder)
order2Router.get("/users-accept", order2Controller.getAllUserAcceptsAndDone)


export default order2Router;
