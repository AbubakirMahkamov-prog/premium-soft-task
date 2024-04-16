// seeder.js
import db from "./db.js";
import userModel from "../models/user.js";
import projectModel from "../models/projects.js";
import clientModel from '../models/client.js';
import order2Model from '../models/order2.js';
// Define your default data
// const defaultUsers = [
//   { 
//     username: 'abubakir', 
//     email: 'abubakir@gmail.com',
//     password: "$2b$10$IToqyTzhNIr8gYRyU/Q/y.6yp1/RCvSwRqOaNWnV.FDgIaFz/Krjm",
//     role: 'admin',
//     projects: [
//       {
//         project_id: '661e4827ef262e8b667ce6d9'
//       },
//       {
//         project_id: '661e4827ef262e8b667ce6d6'
//       }
//     ],
//  },
//  { 
//   username: 'eldor', 
//   email: 'eldor@gmail.com',
//   password: "$2b$10$IToqyTzhNIr8gYRyU/Q/y.6yp1/RCvSwRqOaNWnV.FDgIaFz/Krjm",
//   role: 'user',
//   projects: [
//     {
//       project_id: '661e4827ef262e8b667ce6d7'
//     },
//     {
//       project_id: '661e4827ef262e8b667ce6d8'
//     }
//   ],
// },
// { 
//   username: 'nodir', 
//   email: 'nodir@gmail.com',
//   password: "$2b$10$IToqyTzhNIr8gYRyU/Q/y.6yp1/RCvSwRqOaNWnV.FDgIaFz/Krjm",
//   role: 'user',
//   projects: [
//     {
//       project_id: '661e4827ef262e8b667ce6d9'
//     },
//     {
//       project_id: '661e4827ef262e8b667ce6da'
//     },
//     {
//       project_id: '661e4827ef262e8b667ce6db'
//     }
//   ],
// },
// ];
// const defaultProjects = [
//   {
//     title: "project1",
//     logo: "logo1",
//     url: "url1",
//   },
//   {
//     title: "project2",
//     logo: "logo2",
//     url: "url2",
//   },

//   {
//     title: "project3",
//     logo: "logo3",
//     url: "url3",
//   },
//   {
//     title: "project4",
//     logo: "logo4",
//     url: "url4",
//   },
//   {
//     title: "project5",
//     logo: "logo5",
//     url: "url5",
//   },
//   {
//     title: "project6",
//     logo: "logo6",
//     url: "url6",
//   },

//   {
//     title: "project7",
//     logo: "logo7",
//     url: "url7",
//   },
// ]

// const defaultClients = [
//   {
//     username: "Komiljon",
//     phone: "998990000000",
//     address: "Andijon",
//   },
//   {
//     username: "Shokirjon",
//     phone: "9989900000001",
//     address: "Fargona",
//   },
//   {
//     username: "Egamberdi",
//     phone: "9989900000001",
//     address: "Namangan",
//   },
// ]

const defaultOrders = [
  {
    title: "Order1",
    descrioption: "order1",
    status: "new",
    client_id: "661e4a502dc3f9882be871ad",
    project_id: "661e4827ef262e8b667ce6d5",
    user_id: "661e4957cb6c0e71e8ec1730",
  },
  {
    title: "Order2",
    descrioption: "order2",
    status: "new",
    client_id: "661e4a502dc3f9882be871ad",
    project_id: "661e4827ef262e8b667ce6da",
    user_id: "661e4957cb6c0e71e8ec1730",
  },
  {
    title: "Order3",
    descrioption: "order3",
    status: "new",
    client_id: "661e4a502dc3f9882be871ae",
    project_id: "661e4827ef262e8b667ce6d9",
    user_id: "661e4957cb6c0e71e8ec1730",
  },
  {
    title: "Order4",
    descrioption: "order4",
    status: "new",
    client_id: "661e4a502dc3f9882be871af",
    project_id: "661e4827ef262e8b667ce6d7",
    user_id: "661e4957cb6c0e71e8ec1730",
  },
]



// Insert default data
async function seedDatabase() {
  try {
    // await projectModel.create(defaultProjects)
    // Insert default users
    // await userModel.create(defaultUsers);
    // await clientModel.create(defaultClients)
    await order2Model.create(defaultOrders)
    // console.log('Default data inserted successfully');



  } catch (err) {
    console.error('Error inserting default data:', err);
  } finally {
    db.close()
  }
}

seedDatabase();
