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
            const obj = model._doc;
            ctx.body = {
                ...obj
            };

        } catch (err) {
           ctx.status = 400;
           ctx.body = err.message;
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

            let model = await userModel.updateOne({
                _id: id
            }, query)
            
            ctx.body = model;

        } catch (err) {
           ctx.status = 400;
           ctx.body = err.message;
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

            if (!model) {
                ctx.status = 404;
                ctx.body = "Model not found!"
                return
            }

            ctx.body = model;
            
        } catch (err) {
            ctx.status = 500;
            ctx.body = err.message
        }
    }
    deleteOne = async function (ctx, next) {
        const { id } = ctx.request.params;
        try {
            const model = await userModel.deleteOne({
                _id: id
            })
            ctx.body = model
        } catch (error) {
            ctx.status = 500;
            ctx.body = err.message
        }
    }
}

export default UserController;