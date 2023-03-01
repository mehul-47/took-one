const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContact,
  deleteContact,
} = require("../Controllers/ContactUsController");
const {
  authenticateUser,
  authorizePermission,
} = require("../Middleware/Authentication");

router
  .route("/contact")
  .post(createContact)
  .get([authenticateUser, authorizePermission("admin")], getAllContact);
router
  .route("/:id")
  .delete([authenticateUser, authorizePermission("admin")], deleteContact);
module.exports = router;
