import productModel from "../models/product.js";

class ProductController {
    create = async function (ctx, next) {
      
        try {
            let model = await productModel.create(ctx.request.body)
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
            title,
            color,
            description,
            price
        } = ctx.request.body;
        

        try {

            let model = await productModel.updateOne({
                _id: id
            }, {
                title,
                color,
                description,
                price
            })
            if (!model) {
                ctx.status = 404;
                ctx.body = "Model not found!"
                return
            }
            ctx.body = model;

        } catch (err) {
           ctx.status = 400;
           ctx.body = err.message;
        }  
    }
    getAll = async function (ctx, next) {
        const modelList = await productModel.find({}, '_id title color description amount price');
        ctx.body = modelList;
    }
    getOne = async function (ctx, next) {
        const { id } = ctx.request.params;
        try {
            const model = await productModel.findOne({
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

    deleteOne = async function (ctx, next) {
        const { id } = ctx.request.params;
        try {
            const model = await productModel.deleteOne({
                _id: id
            })
            ctx.body = model
        } catch (error) {
            ctx.status = 500;
            ctx.body = err.message
        }
    }
}

export default ProductController;