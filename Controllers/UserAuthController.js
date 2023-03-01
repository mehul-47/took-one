const User = require("../Model/User");
const OtpModel = require("../Model/Otp");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendOTP,
} = require("../utils");

const registerAsAdmin = async (req, res) => {
  const { name, email, password, dateofbirth } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    dateofbirth,
    role: "admin",
  });
  const tokenUser = createTokenUser(user);
  const Token = attachCookiesToResponse({ res, user: tokenUser });
  let otp = Math.floor(1000 + Math.random() * 9000);
  await sendOTP({
    userID: user._id,
    email: user.email,
    otp: otp,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: `Please verify using OTP: ${otp}`, Token });
};

const register = async (req, res) => {
  const { name, email, password, dateofbirth } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  const user = await User.create({ name, email, password, dateofbirth });
  const tokenUser = createTokenUser(user);
  const Token = attachCookiesToResponse({ res, user: tokenUser });
  let otp = Math.floor(1000 + Math.random() * 9000);
  await sendOTP({
    userID: user._id,
    email: user.email,
    otp: otp,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: `Please verify using OTP`, Token });
};

const resendOtp = async (req, res) => {
  const { userID } = req.body;
  const user = await User.findOne({ _id: userID });
  let otp = Math.floor(1000 + Math.random() * 9000);
  if (!user) {
    throw new CustomError.BadRequestError("Email does not exists");
  } else {
    await sendOTP({
      userID: user._id,
      email: user.email,
      otp: otp,
    });
  }
  res
    .status(StatusCodes.CREATED)
    .json({ msg: `Please verify using OTP: ${otp}` });
};

const verifyOtp = async (req, res) => {
  let user = await User.findOne({ _id: req.body.userID });
  let otpNumber = await OtpModel.findOne({ userID: user._id.toString() });
  if (req.body.otp === otpNumber.otp) {
    const tokenUser = createTokenUser(user);
    const Token = attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ msg: "user verified", Token });
    let otpNumber = await OtpModel.findOneAndRemove({ userID: user._id });

    let datauser = await User.findOneAndUpdate(
      { _id: user._id },
      { status: "active" },
      { new: true, runValidators: true }
    );
  } else {
    res.status(StatusCodes.OK).send("user verification failed");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  // const isUserActive = await user.status === "active"
  if (user.status === "inactive") {
    throw new CustomError.UnauthenticatedError("User verification is pending");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  let otp = Math.floor(1000 + Math.random() * 9000);
  if (user.role === "admin") {
    // const tokenUser = createTokenUser(user)
    // const Token = attachCookiesToResponse({res,user:tokenUser})
    await sendOTP({
      userID: user._id,
      email: user.email,
      otp: otp,
    });
    res.status(StatusCodes.OK).json({
      msg: `Please verify using OTP`,
      userId: user._id,
      TFA: true,
    });
  } else {
    const tokenUser = createTokenUser(user);
    const Token = attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser, Token, TFA: false });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }
  const user = await User.findOne({ email });
  if (user) {
    let otp = Math.floor(1000 + Math.random() * 9000);

    await sendOTP({
      userID: user._id,
      email: user.email,
      otp: otp,
    });
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email for reset password OTP" });
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });
  if (user) {
    user.password = password;
    await user.save();
  }
  res.send("reset password");
};

const logout = async (req, res) => {
  res.header('x-access-token', ' ');
  res.status(StatusCodes.OK).json({ msg: "user successfully logged out!" });
};
const isAdmin = async (req, res) => {
  res.status(StatusCodes.OK).json({ status: true });
};
module.exports = {
  registerAsAdmin,
  register,
  login,
  verifyOtp,
  logout,
  resendOtp,
  forgotPassword,
  resetPassword,
  isAdmin,
};
