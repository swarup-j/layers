const express = require("express");
const {
  loginController,
  registerController,
  logoutController,
  getCurrentUserController,
  sendVerificationController,
  forgotPasswordController,
  resetPasswordController,
} = require("../controllers/auth-controller");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/logout", logoutController);
router.get("/me", getCurrentUserController);
router.post("/send-verification", sendVerificationController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

module.exports = router;
