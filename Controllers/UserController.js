const User = require("../Model/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllUser = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users, count: users.length });
};

const getSingleUser = async (req, res) => {
  const { id: userID } = req.params;

  const user = await User.findOne({ _id: userID }).select("-password");
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id:${userID}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id:${userID}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const deleteUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOneAndRemove({ _id: userID });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id:${userID}`);
  }
  res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};

module.exports = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
