// const user = require("../Model/User");
// const Admin = require("../Model/Admin");
const OtpModel = require("../Model/Otp");
const { sendVerificationEmail } = require("./SendVerificationEmail");

const sendOTP = async ({ userID, email, otp }) => {
  let processed = false;
  const userIdAlreadyExists = await OtpModel.findOne({ userID: userID });

  if (userIdAlreadyExists) {
    const updateOTP = await OtpModel.findOneAndUpdate(
      { userID: userID },
      { otp: otp, expiresAt: new Date(Date.now() + 1000 * 60 * 60) },
      { new: true, runValidators: true }
    ).then(() => {
      processed = true;
    });
  } else {
    let OTP = await new OtpModel({
      userID: userID,
      otp: otp,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    })
      .save()
      .then(() => {
        processed = true;
      })
      .catch((err) => {
        console.log(err, "error dsfdf");
      });
  }
  if (processed) {
    await sendVerificationEmail({
      email: email,
      otp: otp,
    });
  }
};

module.exports = sendOTP;
