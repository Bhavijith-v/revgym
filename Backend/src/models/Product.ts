import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  title: String,
  brand: String,
  price: Number, // paise? for INR; keep rupees for now
  image: String,
  category: String,
  rating: Number,
  options: {
    flavors: [String],
    sizes: [String]
  }
}, { timestamps: true });

export default model("Product", ProductSchema);
