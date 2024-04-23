import * as Koa from "koa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../starters/config.js";
import userModel from "../models/user.js";
import client from "../redis/redisClient.js";
class AuthController {

    login = async function (ctx, next) {
        try {
            let data = ctx.request.body;
            if (!data.password) {
                ctx.status = 400;
                ctx.message = "Passoword is not sent!";
                ctx.body = "Bad request!"
                return
            };
    
            let user =  await userModel.findOne({
                username: data.username
            });
            
            if(!user) {
                ctx.status = 400;
                ctx.message = "User not found!";
                ctx.body = "Bad request!"
                return
            }
            await client.SET('user', 'Abubakir', 'EX', 3);
            setTimeout(async () => {
                const clientUser = await client.GET('user');
                console.log(clientUser)
            }, 2000)
            
            setTimeout(async () => {
                const clientUser = await client.GET('user');
                console.log(clientUser)
            }, 5000)
            ctx.body = {
                ...user
            }
        } catch(err) {
            console.log(err)
        }
        
    }

    refresh = async function (ctx, next) {
        const cookies = await ctx.cookies.get('jwt');
        if (!cookies) {
            ctx.status = 401;
            ctx.body = {
                message: "Unauthorized!"
            }
        }
      
        const refreshToken = cookies
        try {
            const decoded = jwt.verify(
                refreshToken,
                config.REFRESH_TOKEN_SECRET ? config.REFRESH_TOKEN_SECRET: ""
            )

            const user = await userModel.findOne({
                _id: decoded.userId,
            })

            if (!user) {
                ctx.status = 401;
                ctx.body = {
                    message: "Unauthorized!"
                }
            }
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "userId": user?._id
                    }
                },
                config.ACCESS_TOKEN_SECRET ? config.ACCESS_TOKEN_SECRET: "",
                { expiresIn: '15m' }
            )
            ctx.body = {
                accessToken
            }
        } catch(err) {
            ctx.status = 401;
            ctx.body = {
                err
            }
        }
    }
    logout = async function (ctx, next) {
        const cookies = await ctx.cookies.get('jwt');
        if (!cookies) {
            ctx.status = 204;
            return
        }
        ctx.cookies.set('jwt', '');
        ctx.body = { 
            message: 'Cookie cleared'
        }
    }
}

export default AuthController;