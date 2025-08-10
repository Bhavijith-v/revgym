import { Schema, model, Types } from "mongoose";

const UserSchema = new Schema({
  phone: { type: String, unique: true, required: true },
  name: { type: String, default: "" },
  city: { type: String, default: "Bangalore" },
  avatarUrl: String,
  // simple saved cards (masked)
  cards: [{ brand: String, last4: String, tokenRef: String }],
  // preferences/tags
  tags: [String],
}, { timestamps: true });

export type UserDoc = typeof UserSchema extends infer U ? U : any;
export default model("User", UserSchema);
