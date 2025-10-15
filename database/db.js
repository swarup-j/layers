require("dotenv").config();
const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("Connected to MongoDB database Layers");
  } catch (error) {
    console.error("MongoDB Connection error : ", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
