import mongoose from "mongoose";

const { Schema } = mongoose;

const BillSchema = new Schema({
  billNumber: {
    type: String,
    required: [true, "The number of the bill is obligatory"],
    unique: true,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "The product is obligatory"],
    },
  ],

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "The user is obligatory"],
  },

  amount: {
    type: Number,
    required: [true, "The amount of products is obligatory"],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "PAID"],
    default: "PENDING",
  },
});

export default mongoose.model("Bill", BillSchema);
