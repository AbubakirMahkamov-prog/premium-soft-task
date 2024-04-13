import * as Koa from "koa";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
class UserController {
    create = async function (ctx, next) {
        const { name, age, role } = ctx.requst.body;
        userModel.create({
            name: String,
            age: Number,
            role: String
        })
        ctx.body = 'ok'
    }
}

export default UserController;