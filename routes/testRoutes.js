const express = require("express");
const { testController } = require("../controller/testController");
// const errorMiddleware = require("../middleware/errorMiddleware");

const router = express.Router();

router.post("/test-post", testController);

module.exports = router;
