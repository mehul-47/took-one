const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    description: {
      type: String,
      required: true,
    },
    netprice: {
      type: Number,
      required: [true, "please provide product price"],
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    grossprice: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
    },
    instock: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["activated", "deactivated"],
      default: "activated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
