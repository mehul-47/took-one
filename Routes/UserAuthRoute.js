const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermission,
} = require("../Middleware/Authentication");
const {
  registerAsAdmin,
  register,
  login,
  verifyOtp,
  logout,
  resendOtp,
  forgotPassword,
  resetPassword,
  isAdmin,
} = require("../Controllers/UserAuthController");

router
  .route("/adminregister")
  .post([authenticateUser, authorizePermission("admin")], registerAsAdmin);

router.route("/register").post(register);
router.route("/resend").post(resendOtp);
router.route("/login").post(login);
router.route("/verifyOtp").post(verifyOtp);
router.route("/logout").get(logout);
router
  .route("/isadmin")
  .get([authenticateUser, authorizePermission("admin")], isAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").post(resetPassword);

module.exports = router;
