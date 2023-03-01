const express = require("express");
const router = express.Router();

const {
  register,
  login,
  verifyOtp,
  logout,
} = require("../Controllers/AdminuthController");

router.post("/register", register);
router.post("/login", login);
router.post("/verifyOtp", verifyOtp);
router.get("/logout", logout);

module.exports = router;
