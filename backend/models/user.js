// schema and model are in the same file for simplity

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

//returns a user
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true }, // fixed by ziqun
  password: { type: String, required: true },
  numWins: { type: Number, default: 0 }, // fixed by ziqun
  numLosses: { type: Number, default: 0 }, // fixed by ziqun
});

// Pre-save through hashing the password before saving to db.This attaches the pre-save hook to the schema This function runs when .save() is called using this schema
UserSchema.pre("save", async function (next) {
  // compare current state of instance with a original state fetched from data for that entry
  if (!this.isModified("password")) return next(); // "this" is a data entry for db

  // only modified password including for newly registerd account or change of password need to be encrypted by hashing
  try {
    // Generate salt, then hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Proceed to save data entry in db
    next();
  } catch (error) {
    console.error("Error saving user:", error.message);
    next(error);
  }
});

// Pre-save through hashing the password before saving to db.This attaches the pre-save hook to the schema This function runs when .save() is called using this schema
UserSchema.pre("save", async function (next) {
  // compare current state of instance with a original state fetched from data for that entry
  if (!this.isModified("password")) return next(); // "this" is a data entry for db

  // only modified password including for newly registerd account or change of password need to be encrypted by hashing
  try {
    // Generate salt, then hash
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Proceed to save data entry in db
    next();
  } catch (error) {
    console.error("Error saving user:", error.message);
    next(error);
  }
});

// Method to compare hashed passwords
UserSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema,'User' is the model name
export const User = mongoose.model("User", UserSchema);

// Create a new user and save to db
export const createUser = async (username, password) => {
  try {
    const newUser = new User({ username, password });
    await newUser.save(); // triggers the pre-save hook for hashing
    return newUser;
  } catch (error) {
    throw new Error(`User creation failed: ${error.message}`);
  }
};
