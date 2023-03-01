const CustomError = require("../errors");

const checkPermission = (requestUser, resourceUser) => {
  if (requestUser.role === "admin") return;
  if (requestUser.UserId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};
module.exports = checkPermission;
