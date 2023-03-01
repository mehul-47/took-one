const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/ProductController");
const {
  authenticateUser,
  authorizePermission,
} = require("../Middleware/Authentication");

router
  .route("/")
  .post([authenticateUser, authorizePermission("admin")], createProduct)
  .get([authenticateUser, authorizePermission("admin")], getAllProducts);
router
  .route("/:id")
  .get([authenticateUser, authorizePermission("admin")], getSingleProduct)
  .patch([authenticateUser, authorizePermission("admin")], updateProduct)
  .delete([authenticateUser, authorizePermission("admin")], deleteProduct);

module.exports = router;
