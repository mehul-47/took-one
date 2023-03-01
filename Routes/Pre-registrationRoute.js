const express = require("express");
const router = express.Router();
const {
  preregister,
  verifyEmail,
  getAllPreregistration,
} = require("../Controllers/Pre-registrationController");
const {
  authenticateUser,
  authorizePermission,
} = require("../Middleware/Authentication");

router
  .route("/preregister")
  .post(preregister)
  .get([authenticateUser, authorizePermission("admin")], getAllPreregistration);
router.route("/:token").get(verifyEmail);
module.exports = router;
