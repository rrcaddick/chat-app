const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      required: "Email is required",
      unique: "Account already exists",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    profilePicture: {
      type: String,
      required: "Profile picture is required",
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
