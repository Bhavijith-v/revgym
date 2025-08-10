import { Schema, model } from "mongoose";

const PlanSchema = new Schema({
  key: { type: String, unique: true },
  title: String,
  blurb: String,
  price: { monthly: Number, annual: Number }
});

export default model("Plan", PlanSchema);
