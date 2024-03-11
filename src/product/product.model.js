import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: [true, "The product name is obligatory"],
    unique: true,
  },

  description: {
    type: String,
    required: [true, "The description of the product is obligatory"],
  },

  stock: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    required: [true, "The product price is obligatory"],
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Product", ProductSchema);
