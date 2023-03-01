const mongoose = require("mongoose");
const validator = require("validator");
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    image: {
      type: String,
      default: "/public/uploads/example.jpeg",
    },
    company: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      ValidityState: {
        validator: validator.isEmail,
        message: "please provide valid email",
      },
    },
    number: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    notice: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["processed,", "being processed", "open"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
