const express = require("express");
const { testController } = require("../controller/testController");
const userAuth = require("../middleware/authMiddleware")
// const errorMiddleware = require("../middleware/errorMiddleware");

const router = express.Router();

router.post("/test-post",userAuth, testController);

module.exports = router;
