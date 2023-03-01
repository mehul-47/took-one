const mongoose = require("mongoose");
const validator = require("validator");
const PreregistrationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // unique: true,
      ValidityState: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Preregistration", PreregistrationSchema);
