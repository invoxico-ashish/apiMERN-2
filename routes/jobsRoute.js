const express = require("express");
const router = express.Router();

const {
  createjobController,
  getAllJobsController,
} = require("../controller/jobController");
const userAuth = require("../middleware/authMiddleware");

router.post("/create-job", userAuth, createjobController);
router.get("/get-job", userAuth, getAllJobsController);

module.exports = router;
