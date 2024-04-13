import * as Koa from "koa";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
class UserController {
    create = async function (ctx, next) {
        const { name, age, role } = ctx.reqeust.body;
        const model = await userModel.create({
           name,
           age,
           role
        })
        console.log(model)
        ctx.body = model;
    }
}

export default UserController;