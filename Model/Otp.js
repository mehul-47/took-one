const mongoose = require("mongoose");

const OtpModelSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OtpModel", OtpModelSchema);
