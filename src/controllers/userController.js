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

        } catch (error) {
            console.log(error)
            throw new Error("error", error)        
        }        
    }
}

export default UserController;