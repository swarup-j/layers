const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true],
      maxLength: [20],
    },
    email: {
      type: String,
      required: [true],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true],
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: String,
      trim: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timeSamps: true }
);

module.exports = mongoose.model("User", UserSchema);
