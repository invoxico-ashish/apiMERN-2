const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    location: {
      type: String,
      default: "india",
    },
  },
  { timestamps: true }
);

// MIDDELWARE

userSchema.pre("save", async function () {
  if (!this.isModified) return;  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON WEB_TOKEN

userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.SECRET_KEY, {
    expiresIn: "10d",
  });
};

module.exports = mongoose.model("Users", userSchema);
