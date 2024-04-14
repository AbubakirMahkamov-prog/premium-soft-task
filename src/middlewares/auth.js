import * as Koa from "koa";
import { config } from "../starters/config.js";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
export default function auth(...roles) {
    return async function (ctx, next) {

        try {
            const authHeader = ctx.request.headers.authorization;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                ctx.status = 401;
                ctx.body = 'Access denied. No credentials sent!'
                return
            }
            const accessToken = authHeader.replace(bearer, '');
            // Verify Token
            const decoded = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);

            const user = await userModel.findOne({ _id: decoded.userId });

            if (!user) {
                ctx.status = 401;
                ctx.body = 'Authentication failed!'
                return
            }

            //if the uses has not permissions
            if(!roles.includes(user.role)) {
                ctx.status = 401;
                ctx.body = 'Permission denied!'
                return
            }
            // if the user has permissions
            ctx.request.currentUser = user;
            next();

        } catch (err) {
            if (err.message == 'jwt expired') {
                ctx.status = 401;
                ctx.body = 'Access denied due to jwt expired!'
                return
            }
            ctx.status = 401;
            ctx.body = 'Something went wrong!'
            return

        }
    }
}