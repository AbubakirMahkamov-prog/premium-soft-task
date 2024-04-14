import mongoose from "mongoose";
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

        try {
            const user_id = ctx.request.currentUser._id;

            let { totalSumma, totalQuantity, payment, ordered_products } = ctx.request.body;

            let model = await orderModel.updateOne({
                _id: id
            }, {
                user_id,
                totalSumma,
                totalQuantity,
                payment,
                ordered_products
            })
            if (!model) {
                ctx.status = 404;
                ctx.body = "Model not found!"
                return
            }
            ctx.body = {
                ...model
            };

        } catch (err) {
           ctx.status = 400;
           ctx.body = err.message;
        }  
    }
    getAll = async function (ctx, next) {
        const modelList = await orderModel.aggregate([
            { $unwind: "$ordered_products" }, 
            {
                $lookup: { 
                    from: "products", // The collection to join
                    localField: "ordered_products.product_id", // The field from the orders collection
                    foreignField: "_id", // The field from the products collection
                    as: "ordered_products.product" // The alias for the joined products
                },
            },
            { $unwind: "$ordered_products.product" }, // Unwind the joined products array
            {
                $lookup: { 
                    from: "users", // The collection to join
                    localField: "user_id", // The field from the orders collection
                    foreignField: "_id", // The field from the products collection
                    as: "user" // The alias for the joined products
                },
            },
            { $unwind: "$user" },
            { $group: { // Group the results to recreate the original structure
                _id: "$_id",
                user_id: { $first: "$user_id" },
                totalSumma: { $first: "$totalSumma" },
                totalQuantity: { $first: "$totalQuantity" },
                date: { $first: "$date" },
                username: { $first: "$user.username" },
                ordered_products: {
                    $push: {
                        prd_id: "$ordered_products.product_id",
                        price: "$ordered_products.price",
                        amount: "$ordered_products.amount",
                        summa: "$ordered_products.summa",
                        product_title: "$ordered_products.product.title"
                    }
                }
            }}
        ]);
        ctx.body = modelList;
    }
    getOne = async function (ctx, next) {
        const { id } = ctx.request.params;
        try {
            const model = await orderModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } }, 
                { $unwind: "$ordered_products" }, 
                {
                    $lookup: {
                        from: "products", // The collection to join
                        localField: "ordered_products.product_id", // The field from the orders collection
                        foreignField: "_id", // The field from the products collection
                        as: "ordered_products.product" // The alias for the joined products
                    },
                },
                { $unwind: "$ordered_products.product" }, // Unwind the joined products array
                {
                    $lookup: { 
                        from: "users", // The collection to join
                        localField: "user_id", // The field from the orders collection
                        foreignField: "_id", // The field from the products collection
                        as: "user" // The alias for the joined products
                    },
                },
                { $unwind: "$user" },
                { $group: { // Group the results to recreate the original structure
                    _id: "$_id",
                    user_id: { $first: "$user_id" },
                    totalSumma: { $first: "$totalSumma" },
                    totalQuantity: { $first: "$totalQuantity" },
                    date: { $first: "$date" },
                    username: { $first: "$user.username" },
                    ordered_products: {
                        $push: {
                            prd_id: "$ordered_products.product_id",
                            price: "$ordered_products.price",
                            amount: "$ordered_products.amount",
                            summa: "$ordered_products.summa",
                            product_title: "$ordered_products.product.title"
                        }
                    }
                }}
            ]);
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
            const model = await orderModel.deleteOne({
                _id: id
            })
            ctx.body = model
        } catch (error) {
            ctx.status = 500;
            ctx.body = err.message
        }
    }
}

export default OrderController;