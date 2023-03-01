const express = require("express");
const router = express.Router();
const {
  createContact,
  getAllContact,
  updateContact,
  deleteContact,
} = require("../Controllers/ContactController");
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
  .patch([authenticateUser, authorizePermission("admin")], updateContact)
  .delete([authenticateUser, authorizePermission("admin")], deleteContact);
module.exports = router;
