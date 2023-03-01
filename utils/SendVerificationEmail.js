const sendEmail = require("./SendEmail");

// VERIFICATIONLINK=https://took-one.herokuapp.com/api/v1/preregister/


const sendVerificationEmail = async ({ email, otp }) => {
  return sendEmail({
    to: email,
    subject: "OTP For Verification",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>", // html body
  });
};

const sendVerificationEmaillink = async ({ email, token }) => {
  return sendEmail({
    to: email,
    subject: "Verification link for the registration",
    html:
      "<h3>Verification link for account verification is </h3>" +
      `<a href=${
        process.env.VERIFICATIONLINK + token
      } style='font-weight:bold;'>"
      click here for verification
        "</a>"`, // html body
  });
};

module.exports = { sendVerificationEmail, sendVerificationEmaillink };
