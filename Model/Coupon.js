const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide coupon name"],
  },
  key: {
    type: String,
    required: [true, "Please provide key"],
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    reuired: true,
  },
  expirationdate: {
    type: Date,
  },
  usedtimes: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    enum: ["activated", "deactivated"],
    default: "activated",
  },
});

module.exports = mongoose.model("Coupon", CouponSchema);
