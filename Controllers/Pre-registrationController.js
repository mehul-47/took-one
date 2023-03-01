const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const jwt = require("jsonwebtoken");

const Preregistration = require("../Model/Pre-registration");
const { sendVerificationEmaillink } = require("../utils/SendVerificationEmail");
const { createJWT } = require("../utils");

const preregister = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await Preregistration.findOne({ email });

  if (emailAlreadyExists) {
    if (emailAlreadyExists.status !== "active") {
      const token = createJWT({ payload: { email: emailAlreadyExists.email } });
      await sendVerificationEmaillink({
        email: email,
        token: token,
      });
      res.status(StatusCodes.OK).json({
        msg: "Verification link sent to an email successfully,Please verify",
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Email verification is done already",
      });
    }
  } else {
    const user = await Preregistration.create(req.body);
    const token = createJWT({ payload: { email: user.email } });
    await sendVerificationEmaillink({
      email: email,
      token: token,
    });
    res.status(StatusCodes.OK).json({
      msg: "Verification link sent to an email successfully,Please verify",
    });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
  if (isTokenValid) {
    const emailVerified = await Preregistration.findOneAndUpdate(
      { email: isTokenValid.email },
      { status: "active" },
      { new: true, runValidators: true }
    );
    res.status(StatusCodes.OK).send("email verification successful");
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Token Invalid");
  }
};

const getAllPreregistration = async (req, res) => {
  const preregisteration = await Preregistration.find({});
  if (!preregisteration) {
    throw new CustomError.NotFoundError("No preregistraion avilable");
  }
  res.status(StatusCodes.OK).json(preregisteration);
};

module.exports = {
  preregister,
  verifyEmail,
  getAllPreregistration,
};
