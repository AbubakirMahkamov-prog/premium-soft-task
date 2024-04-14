import * as Koa from "koa";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../starters/config.js";
import userModel from "../models/user.js";




class AuthController {

    login = async function (ctx, next) {
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
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) {
            ctx.status = 400;
            ctx.message = "User not found!";
            ctx.body = "Bad request!"
            return
        }
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "userId": user._id
                }
            },
            config.ACCESS_TOKEN_SECRET ? config.ACCESS_TOKEN_SECRET: "",
            { expiresIn: '3ms' }
        )
    
        const refreshToken = jwt.sign(
            { "userId": user._id },
            config.REFRESH_TOKEN_SECRET ? config.REFRESH_TOKEN_SECRET: "",
            { expiresIn: '7d' }
        )
    
        // Create secure cookie with refresh token 
        ctx.cookies.set('jwt', refreshToken, {
            httpOnly: true, //accessible only by web server 
            secure: false, //https
            sameSite: "strict", //cross-site cookie 
            maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
        })
        // ctx.session.
    
        // Send accessToken containing username and roles 
        ctx.body = {
            accessToken
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