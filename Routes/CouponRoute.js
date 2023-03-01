const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getAllCoupons,
  getSingleCoupons,
  updateCoupons,
  deleteCoupons,
} = require("../Controllers/CouponController");

const {
  authenticateUser,
  authorizePermission,
} = require("../Middleware/Authentication");

router
  .route("/")
  .post([authenticateUser, authorizePermission("admin")], createCoupon)
  .get([authenticateUser, authorizePermission("admin")], getAllCoupons);

router
  .route("/:id")
  .get([authenticateUser, authorizePermission("admin")], getSingleCoupons)
  .patch([authenticateUser, authorizePermission("admin")], updateCoupons)
  .delete([authenticateUser, authorizePermission("admin")], deleteCoupons);

module.exports = router;
