import * as Koa from "koa";
import bcrypt from "bcrypt";

class UserController {
    create = async function (ctx, next) {
        console.log(ctx.body)
    }
}

export default UserController;