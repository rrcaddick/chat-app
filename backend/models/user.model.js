const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

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
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const saltRounds = Number(process.env.HASH_SALT_ROUNDS);

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.statics.revokeToken = async function (userId) {
  const user = await this.findById(userId);
  await user.clearRefreshToken();
};

userSchema.methods.validatePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

userSchema.methods.clearRefreshToken = async function () {
  this.refreshToken = undefined;
  await this.save();
};

userSchema.methods.recylceRefreshToken = async function (refreshToken) {
  this.refreshToken = refreshToken;
  await this.save();
};

module.exports = mongoose.model("User", userSchema);
