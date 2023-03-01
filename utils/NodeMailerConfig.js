module.exports = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
