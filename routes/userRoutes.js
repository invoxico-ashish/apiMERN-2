const express = require("express");
const userAuth = require("../middleware/authMiddleware");
const { updateUserController } = require("../controller/userController");
const router = express.Router();

// UPDATE USER

router.put("/update-user", userAuth, updateUserController);

module.exports = router;
