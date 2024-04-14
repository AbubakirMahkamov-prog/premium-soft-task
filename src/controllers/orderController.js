import orderModel from "../models/order.js";
class OrderController {
    create = async function (ctx, next) {
      
        try {
            let { totalSumma, totalQuantity, payment, ordered_products } = ctx.request.body;
            const user_id = ctx.request.currentUser._id;
            let model = await orderModel.create({
                user_id,
                totalSumma,
                totalQuantity,
                payment,
                ordered_products
            })
            ctx.body = model;

        } catch (err) {
           ctx.status = 400;
           ctx.body = err.message;
        }        
    }
    update = async function (ctx, next) {
        const { id } = ctx.request.params;
        let {
            title,
            color,
            description,
            price
        } = ctx.request.body;
        

        try {

            let model = await orderModel.findOneAndUpdate({
                _id: id
            }, {
                title,
                color,
                description,
                price
            })
            
            ctx.body = model;

        } catch (err) {
           ctx.status = 400;
           ctx.body = err.message;
        }  
    }
    getAll = async function (ctx, next) {
        const modelList = await orderModel.find({}, '_id title color description amount price');
        ctx.body = modelList;
    }
    getOne = async function (ctx, next) {
        const { id } = ctx.request.params;
        try {
            const model = await orderModel.findOne({
                _id: id
            }, '_id title color description amount price');
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
}

export default OrderController;