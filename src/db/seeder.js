// seeder.js
import db from "./db.js";
import userModel from "../models/user.js";
// Define your default data
const defaultUsers = [
  { 
    username: 'abubakir', 
    email: 'abubakir@gmail.com',
    password: "$2b$10$IToqyTzhNIr8gYRyU/Q/y.6yp1/RCvSwRqOaNWnV.FDgIaFz/Krjm",
    role: 'admin'
 },
];

// Insert default data
async function seedDatabase() {
  try {

    // Insert default users
    await userModel.create(defaultUsers);

    console.log('Default data inserted successfully');

  } catch (err) {
    console.error('Error inserting default data:', err);
  } finally {
    db.close()
  }
}

seedDatabase();
