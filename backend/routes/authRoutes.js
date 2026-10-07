const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
// const {
//   googleLogin,
// } = require("../controllers/googleAuthController");
const {
  registerValidator,
  loginValidator,
  validate,
} = require("../validators/authValidator.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post("/register", registerValidator, validate, authController.register);
router.post("/login", loginValidator, validate, authController.login);
router.get("/getMe", authMiddleware, authController.getMe);
// router.post(
//   "/google",
//   googleLogin
// );

router.put(
  "/change-password",
  authMiddleware,
  authController.changePassword
);

module.exports = router;
