import mongoose from "mongoose";
import order2Model from "../models/order2.js";
import userModel from "../models/user.js";
class Order2Controller {
   getAllUserWithNewOrder = async(ctx, next) => {
        // const modelList = await userModel.aggregate([
        //     { $unwind: "$projects" },
        //     {
        //         $lookup: {
        //           from: 'orders2', 
        //           localField: 'projects.project_id', 
        //           foreignField: 'project_id', 
        //           as: 'orders',
        //           pipeline: [
        //             {
        //                 $match: {
        //                     status: 'new'
        //                 }
        //             }
        //         ],
    
        //         }
        //     },
        //     {
        //         $group: {
        //           _id: '$_id',
        //           username: { $first: '$username' },
        //           orders: { $first: "$orders" }
        //         }
        //     }
        // ]);
        const user = await userModel.findById(req.params.id)
        let result = await order2Model.find({
            proect: {$in: user.projects}
        })
        ctx.body = modelList;
   }
   
   getAllUserAcceptsAndDone = async(ctx, next) => {

    const accepted = await order2Model.aggregate([
        { $match: { status: "accepted" } },
        {
            $lookup: {
              from: 'users', 
              localField: 'user_id', 
              foreignField: '_id', 
              as: 'users' 
            }
        },
        {
            $unwind: '$users'
        },
        {
            $lookup: {
              from: 'projects', 
              localField: 'project_id', 
              foreignField: '_id', 
              as: 'projects' 
            }
        },
        {
            $unwind: '$projects'
        },
        {
            $group: {
              _id: '$users._id',
              username: { $first: '$users.username' },
              project_title: { $first: '$projects.title' },
              orders: {
                $push: {
                    title: "$title",
                    status: "$status",
                }
              }
            }
          }
    ])

    const done = await order2Model.aggregate([
        { $match: { status: "done" } },
        {
            $lookup: {
              from: 'users', 
              localField: 'user_id', 
              foreignField: '_id', 
              as: 'users' 
            }
        },
        {
            $unwind: '$users'
        },
        {
            $lookup: {
              from: 'projects', 
              localField: 'project_id', 
              foreignField: '_id', 
              as: 'projects' 
            }
        },
        {
            $unwind: '$projects'
        },
        {
            $group: {
              _id: '$users._id',
              username: { $first: '$users.username' },
              project_title: { $first: '$projects.title' },
              orders: {
                $push: {
                    title: "$title",
                    status: "$status",
                }
              }
            }
          }
    ])

    ctx.body = {
        accepted,
        done
    };
   }
}

export default Order2Controller;