const mongoose = require("mongoose");

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost/auth-demo");
    console.log("Database connected");
  } catch (error) {
    console.log("Connecting to database failed!");
  }
}
