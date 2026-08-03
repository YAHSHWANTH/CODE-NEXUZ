// models/cnxModel.js
import mongoose from "mongoose";

const cnxSchema = new mongoose.Schema({
  cnxId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String },
  date: { type: Date, default: Date.now },
});

const CNX = mongoose.model("CNX", cnxSchema);
export default CNX;
