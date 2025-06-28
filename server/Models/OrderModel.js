import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    head: {
      type: String,
      required: true,
    },
    temp: {
      type: Number,
      required: true,
      default: 0,
    },
    tpd: {
      type: Number,
      required: true,
      default: 0,
    },
    tsales: {
      type: Number,
      required: true,
      default: 0,
    },
    rem: {
      type: Number,
      required: true,
      default: 0,
    },
    pstatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;