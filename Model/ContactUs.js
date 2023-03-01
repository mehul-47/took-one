const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactUs", ContactUsSchema);
