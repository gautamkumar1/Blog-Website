const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [6, "Username must contain at least 6 character!"],
    maxLength: [32, "Username cannot exceed 32 character!"],
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  role: {
    type: String,
    required: true,
    enum: ["Writer", "Admin"],
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must contain at least 6 character!"],
    maxLength: [1024, "Password cannot exceed 32 character!"],
    select: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: { type: String },
  verificationTokenExpire: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.generateVerificationToken = function() {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  this.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  this.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours
  return verificationToken;
};

userSchema.methods.generateResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

