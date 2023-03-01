const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermission,
} = require("../Middleware/Authentication");
const {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");

router
  .route("/users")
  .get([authenticateUser, authorizePermission("admin")], getAllUser);
router
  .route("/:id")
  .get([authenticateUser, authorizePermission("admin")], getSingleUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);

module.exports = router;
