const nodemailer = require("nodemailer");
const nodemailerConfig = require("./NodeMailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);
  return transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
