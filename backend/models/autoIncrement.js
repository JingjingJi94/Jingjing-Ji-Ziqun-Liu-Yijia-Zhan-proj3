import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 1000 }, // Starting game ID
});

export default mongoose.model("Counter", counterSchema);
