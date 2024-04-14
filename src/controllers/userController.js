import * as Koa from "koa";
import bcrypt from "bcrypt";

import userModel from "../models/user.js";
class UserController {
    create = async function (ctx, next) {
        let {
            username,
            email,
            password,
            role,
            address
        } = ctx.request.body;
        let genSalt = await bcrypt.genSalt(10); 
        password = await bcrypt.hash(password, genSalt);
        try {
            let model = await userModel.create({
                username,
                email,
                password,
                role,
                address
            })
            ctx.body = model;

        } catch (err) {
           ctx.status = 400;
           ctx.body = err;
        }        
    }
}

export default UserController;