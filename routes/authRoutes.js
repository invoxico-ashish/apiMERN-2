const express = require("express");

const {
  registerController,
  loginController,
} = require("../controller/authController");

const router = express.Router();

router.route("/register").post(registerController); // REGISTER USER
router.route("/login").get(loginController); //  LOGIN USER

module.exports = router;
