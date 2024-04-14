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
    update = async function (ctx, next) {
        const { id } = ctx.request.params;
        let {
            username,
            email,
            password,
            role,
            address
        } = ctx.request.body;
        

        try {
            let query = {
                username,
                email,
                role,
                address
            };
            if (password) {
                let genSalt = await bcrypt.genSalt(10); 
                password = await bcrypt.hash(password, genSalt);
                query['password'] = password;
            }

            let model = await userModel.findOneAndUpdate({
                _id: id
            }, query)
            
            ctx.body = model;

        } catch (err) {
           ctx.status = 400;
           ctx.body = err;
        }  
    }
    getAll = async function (ctx, next) {
        const modelList = await userModel.find({}, '_id username email role');
        ctx.body = modelList;
    }
    getOne = async function (ctx, next) {
        const { id } = ctx.request.params;
        try {
            const model = await userModel.findOne({
                _id: id
            }, '_id username email role');
            ctx.body = model;
            
        } catch (err) {
            ctx.status = 500;
            ctx.body = {
                ...err
            }
        }
    }
}

export default UserController;