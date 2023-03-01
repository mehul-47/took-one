const Admin = require("../Model/Admin");
const OtpModel = require("../Model/Otp");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendOTP,
} = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const emailAlreadyExists = await Admin.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await Admin.create({ name, email, password });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  const user = await Admin.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  let otp = Math.floor(1000 + Math.random() * 9000);

  await sendOTP({
    userID: user._id,
    email: user.email,
    otp: otp,
  });

  res.status(StatusCodes.OK).json({ msg: `Please verify using OTP: ${otp}` });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "admin logged out!" });
};

const verifyOtp = async (req, res) => {
  let user = await Admin.findOne({ _id: req.body.userID });
  let otpNumber = await OtpModel.findOne({ userID: user._id.toString() });
  if (req.body.otp === otpNumber.otp) {
    res.status(StatusCodes.OK).send("user verified");
    let otpNumber = await OtpModel.findOneAndRemove({ userID: user._id });
  } else {
    res.status(StatusCodes.OK).send("user verification failed");
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
  logout,
};
