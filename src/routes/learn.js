import Router from "koa-router";
import * as Koa from "koa";
import LearnController from "../controllers/learnController.js";
import authSchema from "../middlewares/validators/authValidator.js";
import joiMiddleware from "../middlewares/joi.middleware.js";


const learnController = new LearnController();

const learnRouter = new Router({ prefix: '/learn' });

